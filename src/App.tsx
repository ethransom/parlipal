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
  state = {
    value: 30,
    origValue: 30,
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
  }

  reset = () => {
    this.stop();
    this.setState({value: this.state.origValue});
  }

  private stop() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
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
      <h1>{this.state.value} / {this.state.origValue}</h1>
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
          <button onClick={this.next}>Next</button>
          <button onClick={this.start}>Start</button>
          <button onClick={this.set}>Set</button>
          <button onClick={this.reset}>Reset</button>
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

  private set = () => {
    this.stop();

    let seconds = getNumber("Set the timer for x minutes") * 60;

    this.setState({origValue: seconds, value: seconds});
  }

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
            <button onClick={this.stop}>Stop</button> :
            <button onClick={this.start}>Start</button>}
          <button onClick={this.set}>Set</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.extend}>Extend</button>
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

class Motion extends React.Component {
  render() {
    return (
      <section className="motion">
        <h1>Motion under discussion</h1>
        <div contentEditable={true}>
          Edit me
        </div>
      </section>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <aside>
          <Timer value={5*60} title="Discussion"/>
          <SpeakersTimer/>
          {/* <SpeakersList/>  */}
        </aside>
        <main>
          <Motion/>
        </main>
      </div>
    );
  }
}

export default App;
