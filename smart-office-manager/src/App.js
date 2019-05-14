import React, { Component } from "react";
import "./resources/styles/App.scss";
import Station from "./Model/Station";
import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";

class App extends Component {
  constructor(props) {
    super(props);
    let location = require("./resources/data/data.json").location;
    let stations = this.loadStations();
    this.state = {
      sideBarChosen: "Stations",
      stationInfo: null,
      location: location,
      stations: stations,
      chosenItem: null,
      chosenStation: null
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
            itemChoose={this.itemChoose}
            chosenItem={this.state.chosenItem}
            onClickSupplyStation={this.onClickSupplyStation}
            chosenStation={this.state.chosenStation}
            updateStations={this.updateStations}
          />
        </div>
      </div>
    );
  }

  updateStations = elements => {
    var clone = this.state.stations;
    clone.map(element => {
      element.elements.map(element => {
        if (element === elements) element = elements;
      });
    });
    this.setState({ stations: clone });
  };

  onClickSideBar = chosen => {
    this.setState({ sideBarChosen: chosen });
    if (chosen === "Station" || chosen === "Item Stock")
      this.resetActiveChilds();
    this.resetItemChoose();
    this.resetChosenStation();
  };

  onClickStation = element => {
    this.setState({
      sideBarChosen: "Station",
      stationInfo: element
    });
    this.resetActiveChilds();
    this.resetItemChoose();
  };

  onClickSupplyStation = element => {
    this.setState({
      sideBarChosen: "Supply Statistics",
      chosenStation: element
    });
  };

  resetChosenStation = () => {
    this.setState({ chosenStation: null });
  };

  goBackToStations = () => {
    this.setState({
      sideBarChosen: "Stations",
      stationInfo: null
    });
    this.resetActiveChilds();
    this.resetItemChoose();
  };

  //Reset the item list (Use this to get the initial list)
  resetActiveChilds = () => {
    var clone = this.state.stations;
    clone.map(element => {
      element.elements.map(element => {
        element.childActive = false;
        element.elements.map(element => {
          element.childActive = false;
        });
      });
    });
    this.setState({ stations: clone });
  };

  itemChoose = element => {
    console.log("Seeeeet");
    this.setState({ chosenItem: element });
  };

  resetItemChoose = () => {
    console.log("Reset");
    this.setState({ chosenItem: null });
  };
}

export default App;
