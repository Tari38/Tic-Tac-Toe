import React, { Component } from "react";
import BoardRow from "./Board-Row";

export default class Board extends Component {
  render() {
    const { squares, handleClick, winnerSquares } = this.props;

    return (
      <>
        <div>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <BoardRow
                key={i}
                values={squares.slice(i * 3, (i + 1) * 3)}
                row={i}
                handleClick={handleClick}
                winnerSquares={winnerSquares}
              />
            ))}
        </div>
      </>
    );
  }
}
