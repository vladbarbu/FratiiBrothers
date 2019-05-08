import React, { Component } from "react";
import "./resources/styles/App.scss";
import Element from "./Model/Element";
import Station from "./Model/Station";
import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";

class App extends Component {
  constructor(props) {
    super(props);
    let location = require("./resources/data/data.json").location;
    let stations = this.loadStations();
    let elements = null;
    let items = null;

    this.state = {
      sideBarChosen: "Stations",
      stationInfo: null,
      location: location,
      stations: stations,
      elements: elements
      //items: items
    };
  }

  loadStations = () => {
    /**
     * Load our array of elements from the json file
     * Will be replaced by a request once networking is done
     */
    try {
      let stations = require("./resources/data/data.json").stations;

      if (stations) {
        let data = [];
        for (let i = 0; i < stations.length; i++) {
          data.push(new Station(stations[i]));
        }
        return data;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

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
            location={this.state.location}
            stations={this.state.stations}
            elements={this.state.elements}
            items={this.state.items}
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
    this.setState({ sideBarChosen: "Stations", stationInfo: null });
  };
}

export default App;
