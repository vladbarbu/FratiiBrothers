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
    //let elements = this.loadElements();
    let stations = this.loadStations();
    //let items = this.loadItems(elements);
    console.log(stations);
    //console.log(elements);
    //console.log(items);
    //let notifications = this.loadNotifications(items);
    this.state = {
      sideBarChosen: "Stations",
      stationInfo: null
    };
  }

  loadNotifications = items => {
    let notifications = [];
    for (let i = 0; i < items.length; i++)
      for (let j = 0; j < items[i].notifications.length; j++)
        notifications.push(items[i].notifications[j]);
    return notifications;
  };

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

  loadStations = () => {
    /**
     * Load our array of elements from the json file
     * Will be replaced by a request once networking is done
     */
    try {
      let stations = require("./resources/data/data.json");
      if (stations) {
        let data = [];
        for (let i = 0; i < stations.length; i++) {
          console.log(stations[i]);
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
