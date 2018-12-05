import * as React from 'react';
import './App.css';

function getNumber(message: string) {
  let val: string | null = null;
  while (val == null || isNaN(parseInt(val))) {
    val = prompt(message);
  }

  return parseInt(val);
}

class SpeakersTimer extends React.Component {
  props: {
    value: number,
  };

  componentWillMount() {
    this.setState({value: this.props.value, origValue: this.props.value});
  }

  componentWillUnmount() {
    if (this.timer !== null) window.clearInterval(this.timer);
  }

  state = {
    value: 30,
    origValue: 30,
    ticking: false,
  }

  private timer: number | null = null;

  set = () => {
    this.reset();

    let value = getNumber("enter number of SECONDS for speakers");

    this.setState({
      value: value,
      origValue: value,
    });
  }

  next = () => {
    this.reset();
    this.start();
  }

  start = () => {
    if (!this.timer && this.state.value > 0) {
      this.timer = window.setInterval(this.tick, 1000);
    }
    this.setState({ticking: true});
  }

  reset = () => {
    this.stop();
    this.setState({value: this.state.origValue});
  }

  private stop = () => {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({ticking: false});
  }

  private tick = () => {
    let newValue = this.state.value - 1;
    if (newValue === 0) {
      this.stop();
    }
    this.setState({value: newValue});
  }

  private renderTime() {
    return (
      <h1>{this.state.value}</h1>
    )
  }

  render() {
    let className = "timer";
    if (this.state.value === 0) {
      className += " ended";
    } else if (this.state.value <= 10) {
      className += " warning";
    }

    return (
      <section className={className}>
        <h3>Speaker</h3>

        {this.renderTime()}

        <p>
          {this.timer ?
            <button className="btn btn-sm btn-primary" onClick={this.stop}>Stop</button> :
            <button className="btn btn-sm btn-primary" onClick={this.start}>Start</button>}
          <button className="btn btn-sm btn-primary" onClick={this.next}>Next</button>
          {/* <button className="btn btn-sm btn-primary"  onClick={this.set}>Set</button> */}
          <button className="btn btn-sm btn-primary"  onClick={this.reset}>Reset</button>
        </p>
      </section>
    )
  }
}

class Timer extends React.Component {
  props = {
    title: "",
    value: 10*60,
  }

  componentWillMount() {
    this.setState({value: this.props.value, origValue: this.props.value});
  }

  componentWillUnmount() {
    if (this.timer !== null) window.clearInterval(this.timer);
  }

  state = {
    origValue: 10*60,
    value: 10*60,
    ticking: false,
  }

  private timer: number | null = null;

  private start = () => {
    if (this.timer) {
      return;
    }
    this.timer = window.setInterval(this.tick, 1000);
    this.setState({ticking: true});
  }

  private stop = () => {
    if (!this.timer) {
      return;
    }
    this.clearTimer();
  }

  private clearTimer() {
    if (!this.timer) {
      return;
    }
    window.clearInterval(this.timer);
    this.timer = null;
    this.setState({ticking: false});
  }

  // private set = () => {
  //   this.stop();

  //   let seconds = getNumber("Set the timer for x minutes") * 60;

  //   this.setState({origValue: seconds, value: seconds});
  // }

  private reset = () => {
    this.stop();
    this.setState({value: this.state.origValue});
  }

  extend = () => {
    let amount = getNumber("Extend timer by x minutes");

    let seconds = amount * 60;

    this.setState({
      value: this.state.value + seconds,
      origValue: this.state.origValue + seconds
    });
  }

  private tick = () => {
    let value = this.state.value;

    value--;

    if (value < 0) {
      value = 0;
      this.clearTimer();
    }

    this.setState({value: value});
  }

  private renderTime(time: number) {
    let seconds = (time % 60).toString();
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }

    return (
      <h1>
        {Math.floor(time / 60)}:{seconds}
      </h1>
    )
  }

  render() {
    let className = "timer";
    if (this.state.value === 0) {
      className += " ended";
    } else if (this.state.value < 60) {
      className += " warning";
    }
    if (this.state.ticking) {
      className += " ticking";
    }

    return (
      <section className={className}>
        <h3>{this.props.title}</h3>

        {this.renderTime(this.state.value)}

        <progress value={-1 * this.state.value + this.state.origValue} max={this.state.origValue}></progress>

        <p>
          {this.state.ticking ?
            <button className="btn btn-sm btn-primary" onClick={this.stop}>Stop</button> :
            <button className="btn btn-sm btn-primary" onClick={this.start}>Start</button>}
          {/* <button className="btn btn-sm btn-primary" onClick={this.set}>Set</button> */}
          <button className="btn btn-sm btn-primary" onClick={this.reset}>Reset</button>
          <button className="btn btn-sm btn-primary" onClick={this.extend}>Extend</button>
        </p>
      </section>
    )
  }
}

// class SpeakersList extends React.Component {
//   state = {
//     speakers: [] as Array<string>,
//   }

//   newSpeaker: HTMLInputElement | null = null

//   private addSpeaker = () => {
//     if (!this.newSpeaker) {
//       return;
//     }

//     let newSpeaker = this.newSpeaker.value;

//     this.setState({speakers: this.state.speakers.concat(newSpeaker)});

//     this.newSpeaker.value = "";
//   }

//   private renderSpeaker(speaker: string) {
//     return <li>{speaker}</li>;
//   }

//   render() {
//     return (
//       <section className="speakersList">
//         <h3>Speakers List</h3>
//         <input type="text" ref={(elm) => this.newSpeaker = elm}/>
//         <button onClick={this.addSpeaker}>Add</button>
//         <ul>
//           {this.state.speakers.map(this.renderSpeaker, this)}
//         </ul>
//       </section>
//     )
//   }
// }

class Motion extends React.PureComponent {
  render() {
    return (
      <section className="motion">
        <h1>Motion under discussion</h1>
        <div contentEditable={true}>Edit me</div>
      </section>
    )
  }
}

class NewDiscussionPopup extends React.Component {
  props: {
    active: boolean,
    onSubmit: (discussion: number, speaker: number) => void,
    onCancel: ()=> void,
  };

  state = {
    discussion: 5,
    speaker: 30,
  }

  close = () => {
    this.props.onCancel();
  }

  submit = () => {
    this.props.onSubmit(this.state.discussion, this.state.speaker);
  }

  render() {
    if (!this.props.active) {
      return null;
    }

    return (
      <div className="popupBackground">
        <div className="popup">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Start New Discussion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="discussionMinutes">Discussion Limit</label>
                    <input type="number" className="form-control" id="discussionMinutes"
                      onChange={e => this.setState({discussion: e.target.value})} value={this.state.discussion}/*placeholder="Password"*//>
                  </div>
                  <div className="form-group">
                    <label htmlFor="speakerSeconds">Speaker Limit</label>
                    <input type="number" className="form-control" id="speakerSeconds"
                      onChange={e => this.setState({speaker: e.target.value})} value={this.state.speaker} /*placeholder="Password"*//>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.close}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.submit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function EndDiscussionPopup(props: {active: boolean, onSubmit: () => void, onCancel: () => void}) {
  if (!props.active) {
    return null;
  }

  return (
    <div className="popupBackground">
      <div className="popup">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Really End Discussion?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onCancel}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Pls confirm this action.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.onCancel}>Close</button>
              <button type="button" className="btn btn-danger" onClick={props.onSubmit}>End Discussion</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AppState {
  newDiscussionPopupActive: boolean;
  endDiscussionPopupActive: boolean;
  discussionSeq: number;
  discussionMinutes: number;
  speakerSeconds: number;
}

class App extends React.Component<{}, AppState> {
  state = {
    newDiscussionPopupActive: false,
    endDiscussionPopupActive: false,
    discussionSeq: 0, // bit of a hack, we need creating a new discussion with the same time as the old to reset the timer
    discussionMinutes: 5 * 60,
    speakerSeconds: 30,
  };

  newDiscussion = (discussion: number, speaker: number) => {
    console.log(`New discussion: ${discussion} minutes, with ${speaker} seconds for speakers`);
    this.setState((state: AppState): Partial<AppState> => ({
      discussionSeq: state.discussionSeq + 1,
      discussionMinutes: discussion * 60,
      speakerSeconds: speaker,
      newDiscussionPopupActive: false,
    }));
  }

  endDiscussion = () => {
    console.log("Ending discussion");
    this.setState((state: AppState): Partial<AppState> => ({
      discussionSeq: state.discussionSeq + 1,
      endDiscussionPopupActive: false,
    }));
  }

  render() {
    return (
      <div className="App">
        <aside>
          <Timer key={'timer-'+this.state.discussionSeq} value={this.state.discussionMinutes} title="Discussion"/>
          <SpeakersTimer key={'speakers-'+this.state.discussionSeq} value={this.state.speakerSeconds}/>
          {/* <SpeakersList/>  */}
          <button onClick={() => this.setState({newDiscussionPopupActive: true})} className="btn btn-primary">New Discussion</button>
          <button onClick={() => this.setState({endDiscussionPopupActive: true})} className="btn btn-danger">End Discussion</button>
        </aside>
        <main>
          <Motion/>
        </main>
        <NewDiscussionPopup
          active={this.state.newDiscussionPopupActive}
          onSubmit={this.newDiscussion}
          onCancel={() => this.setState({newDiscussionPopupActive: false})}/>
        <EndDiscussionPopup
          active={this.state.endDiscussionPopupActive}
          onSubmit={this.endDiscussion}
          onCancel={() => this.setState({endDiscussionPopupActive: false})}/>
      </div>
    );
  }
}

export default App;
