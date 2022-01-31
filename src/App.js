import React from "react";
import Game from "./components/Game";

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="container">
            <h1 className="header">Tic Tac Toe React Challenge</h1>
            <hr />
            <Game />
          </div>
        </div>
      </>
    );
  }
}
export default App;
