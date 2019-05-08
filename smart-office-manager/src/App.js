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
    let elements = this.loadElements(stations);
    let items = this.loadItems(elements);
    console.log(items);
    this.state = {
      sideBarChosen: "Stations",
      stationInfo: null
    };
  }

  loadItems = elements => {
    let items = [];
    for (let i = 0; i < elements.length; i++)
      if (elements[i].type === "category") {
        let subelements = this.loadItems(elements[i].elements);
        for (let j = 0; j < subelements.length; j++) items.push(subelements[j]);
      } else {
        items.push(elements[i]);
      }
    return items;
  };

  loadElements = stations => {
    let elements = [];
    for (let i = 0; i < stations.length; i++)
      if (stations[i].floor) {
        let subelements = this.loadElements(stations[i].elements);
        for (let j = 0; j < subelements.length; j++)
          elements.push(subelements[j]);
      } else {
        elements.push(stations[i]);
      }
    return elements;
  };

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
