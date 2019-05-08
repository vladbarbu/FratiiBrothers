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
      stationInfo: null
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
            stationInfo={this.state.stationInfo}
            goBackToStations={this.goBackToStations}
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
  };

  goBackToStations = () => {
    console.log("Pac");
    this.setState({ sideBarChosen: "Stations", stationInfo: null });
  };
}

export default App;
