import * as React from 'react';
import './App.css';

class Timer extends React.Component {
  props = {
    title: ""
  }

  state = {
    origValue: 10*60,
    value: 10*60,
  }

  private timer: number | null = null;

  private start = () => {
    this.timer = window.setInterval(this.tick, 1000);
  }

  private stop = () => {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }

  private set = () => {
    let val: string | null = null;
    while (val == null || isNaN(parseInt(val))) {
      val = prompt("Set the timer for x minutes:");
    }

    let seconds = parseInt(val) * 60;

    this.setState({origValue: seconds, value: seconds});
    stop();
  }

  private tick = () => {
    let value = this.state.value;

    value--;

    if (value < 0) {
      value = 0;
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

    return (
      <section className={className}>
        <h3>{this.props.title}</h3>

        {this.renderTime(this.state.value)}

        <progress value={-1 * this.state.value + this.state.origValue} max={this.state.origValue}></progress>

        <p>
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
          <button onClick={this.set}>Set</button>
        </p>
      </section>
    )
  }
}

// class SpeakersList extends React.Component {
//   state = {
//     speakers: [] as Array<string>,
//   }

//   private renderSpeaker(speaker: string) {
//     return <li>{speaker}</li>;
//   }

//   render() {
//     return (
//       <section className="speakersList">
//         <h3>Speakers List</h3>
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
          <Timer title="Agenda Item"/>
          <Timer title="Discussion"/>
          {/* <SpeakersList/> */}
        </aside>
        <main>
          <Motion/>
        </main>
      </div>
    );
  }
}

export default App;
