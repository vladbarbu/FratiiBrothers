import React, { Component } from "react";
import "./resources/styles/App.scss";

import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarChosen: "Stations"
    };
  }
  render() {

    return (
      <div className="App">
        <NavBar />
        <div className="App-container">
          <SideMenu
            onClickSideBar={this.onClickSideBar}
            chosen={this.state.sideBarChosen}
          />
          <Main
            sideBarChosen={this.state.sideBarChosen}
          />
        </div>
      </div>
    );
  }

  onClickSideBar = chosen => {
    this.setState({ sideBarChosen: chosen });
  };
}

export default App;
