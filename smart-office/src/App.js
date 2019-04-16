import React, { Component } from "react";
import NavBar from "./Components/navbar";
import "./App.css";
import ItemsContainer from "./Components/ItemsContainer";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ItemsContainer />
      </div>
    );
  }
}

export default App;
