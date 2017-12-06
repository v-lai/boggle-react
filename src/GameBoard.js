import React, { Component } from 'react';
import './GameBoard.css';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: shuffledDice,
      letterArr: [],
      word: '',
      checked: new Array(25).fill(false),
      seen: [],
      total: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i) {
    const letterArr = this.state.letterArr.slice();
    const checked = this.state.checked.slice();
    let opp = this.state.checked[i];
    const prevLetter = letterArr[letterArr.length - 1];

    if (i === prevLetter) {
      opp = !opp;
      letterArr.pop();
    } else {
      if (letterArr.length === 0 ||
        (allowed[prevLetter].includes(i) && !letterArr.includes(i))) {
        opp = !opp;
        letterArr.push(i);
      }
    }
    const word = letterArr.map((e) => this.state.dice[+e].toUpperCase()).join('');

    this.setState({
      word: word,
      letterArr: letterArr,
      checked: checked.slice(0, i).concat([opp, ...checked.slice(i + 1)])
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const scoring = [0, 0, 0, 1, 1, 2, 3, 5, 11];
    let total = this.state.total;
    let score = 0;

    if (this.state.word.length < 8) {
      score = scoring[this.state.word.length];
    } else {
      score = scoring[8];
    }

    const seen = this.state.seen.slice();
    const isNotSeenIn = seen.every((e) => e[0] !== this.state.word);
    if (isNotSeenIn) {
      seen.push([this.state.word, score]);
      total += score;
    }

    this.setState({
      letterArr: [],
      word: '',
      checked: new Array(25).fill(false),
      seen: seen,
      total: total,
    });
  }

  render() {
    const gameDice = this.state.dice.map((e, i) => <button className={`box ${this.state.checked[i]}`} name="word" key={i} onClick={() => this.handleChange(i)}>{e}</button>);
    const wordScoring = this.state.seen.map((e, i) => <tr key={i}><td>{e[0]}</td><td>{e[1]}</td></tr>);
    return (
      <div className="container">
        <div className="inner-container">
          <div className="gameboard">
            {gameDice}
          </div>
          <div className="current-submit">
            <span className="current-word"><strong>Currrent Word:</strong> {this.state.word}</span>
            <button className="new-word" onClick={this.handleSubmit}>Submit Word</button>
          </div>
          <div className="scoring">
            <table>
              <thead>
                <tr>
                  <th className="word-th">Word</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {wordScoring}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total:</td>
                  <td>{this.state.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// allowed moves
// (may want to revisit/refactor this to be done in a more elegant way)
const allowed = {
  0: [1, 5, 6],
  1: [0, 2, 5, 6, 7],
  2: [1, 3, 6, 7, 8],
  3: [2, 4, 7, 8, 9],
  4: [3, 8, 9],
  5: [0, 1, 6, 10, 11],
  6: [0, 1, 2, 5, 7, 10, 11, 12],
  7: [1, 2, 3, 6, 8, 11, 12, 13],
  8: [2, 3, 4, 7, 9, 12, 13, 14],
  9: [3, 4, 8, 13, 14],
  10: [5, 6, 11, 15, 16],
  11: [5, 6, 7, 10, 12, 15, 16, 17],
  12: [6, 7, 8, 11, 13, 16, 17, 18],
  13: [7, 8, 9, 12, 14, 17, 18, 19],
  14: [8, 9, 13, 18, 19],
  15: [10, 11, 16, 20, 21],
  16: [10, 11, 12, 15, 17, 20, 21, 22],
  17: [11, 12, 13, 16, 18, 21, 22, 23],
  18: [12, 13, 14, 17, 19, 22, 23, 24],
  19: [13, 14, 18, 23, 24],
  20: [15, 16, 21],
  21: [15, 16, 17, 20, 22],
  22: [16, 17, 18, 21, 23],
  23: [17, 18, 19, 22, 24],
  24: [18, 19, 23]
};

// list for 5x5 grid of dice
const dice = [
  'aaafrs',
  'aaeeee',
  'aafirs',
  'adennn',
  'aeeeem',
  'aeegmu',
  'aegmnn',
  'afirsy',
  'bjkqxz',
  'ccenst',
  'ceiilt',
  'ceilpt',
  'ceipst',
  'ddhnot',
  'dhhlor',
  'dhlnor',
  'dhlnor',
  'eiiitt',
  'emottt',
  'ensssu',
  'fiprsy',
  'gorrvw',
  'iprrry',
  'nootuw',
  'ooottu'
];

const shuffle = (arr, curIdx = arr.length, randIdx) => {
  if (curIdx === 0) return arr;
  randIdx = Math.floor(Math.random() * curIdx);
  curIdx -= 1;
  [arr[curIdx], arr[randIdx]] = [arr[randIdx], arr[curIdx]];
  return shuffle(arr, curIdx, randIdx);
};

const shuffledDice = shuffle(dice).map((e, i) => {
  const oneDie = shuffle(e.split(''));
  oneDie[0] = oneDie[0] === 'q'
    ? oneDie[0].toUpperCase() + 'u'
    : oneDie[0].toUpperCase();
  return oneDie[0];
});
