import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: "X",
          moveTo: null
        }
      ],
      stepNumber: 0
    };
    this.state = this.initialState;
  }
  onResetClick(e) {
    e.preventDefault();
    this.setState(this.initialState);
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = current.xIsNext;
    const xIsNext = current.xIsNext === "X" ? "O" : "X";
    this.setState({
      history: history.concat({ squares, xIsNext, moveTo: 1 }),
      stepNumber: history.length
    });
  };

  jumpTo = (step) => {
    this.setState({
      stepNumber: step
    });
  };

  render() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];

    const moves = history.map((step, i) => {
      const desc = i ? `View move #${i}` : "Start game";
      return (
        <>
          <li key={i} className={stepNumber === i ? "current-move" : null}>
            <button className="menu-btn" onClick={() => this.jumpTo(i)}>
              {desc}
            </button>
          </li>
        </>
      );
    });

    const winnerSquares = calculateWinner(current.squares);
    let status;
    if (winnerSquares) {
      status = `Winner: ${current.squares[winnerSquares[0]]}`;
    } else {
      status = stepNumber !== 9 ? `Next player: ${current.xIsNext}` : "Tie";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={this.handleClick}
            winnerSquares={winnerSquares}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div>{moves}</div>
        </div>
        <button
          className="reset"
          type="button"
          onClick={this.onResetClick.bind(this)}
        >
          Reset
        </button>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
