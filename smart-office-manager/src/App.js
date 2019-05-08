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
      sideBarChosen: "Stations",
      stationInfo: [{ parentID: 0, stationID: 0 }]
    };
  }
  render() {
    return (
      <div className="App">
        <NavBar
          onClickNotifications={this.onClickSideBar}
          chosen={this.state.sideBarChosen}
        />
        <div className="App-container">
          <SideMenu
            onClickSideBar={this.onClickSideBar}
            chosen={this.state.sideBarChosen}
          />
          <Main
            sideBarChosen={this.state.sideBarChosen}
            onClickStation={this.onClickStation}
          />
        </div>
      </div>
    );
  }

  onClickSideBar = chosen => {
    this.setState({ sideBarChosen: chosen });
  };

  onClickStation = element => {
    this.setState({ sideBarChosen: "Station", stationInfo: element });
    console.log(this.state.stationInfo);
  };
}

export default App;
