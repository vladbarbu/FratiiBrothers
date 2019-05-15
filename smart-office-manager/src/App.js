import React, { Component } from "react";
import "./resources/styles/App.scss";
import Station from "./Model/Station";
import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";
import ConfirmationPopup from "./Components/ConfirmationPopup";
import InputPopup from "./Components/InputPopup";

class App extends Component {
  constructor(props) {
    super(props);
    let location = require("./resources/data/data.json").location;
    let stations = this.loadStations();
    let items = this.getAllItems(stations);

    let mappedItems = this.mapItemsToStock(stations);
    this.state = {
      sideBarChosen: "Stations",
      stationInfo: null,
      location: location,
      stations: stations,
      items: items,
      mappedItems: mappedItems,
      chosenItem: null,
      chosenStation: null,
      showConfirmationPopup: false,
      showInputPopup: false
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
            items={this.state.items}
            itemStocks={this.state.mappedItems}
            itemChoose={this.itemChoose}
            chosenItem={this.state.chosenItem}
            onClickSupplyStation={this.onClickSupplyStation}
            chosenStation={this.state.chosenStation}
            updateStations={this.updateStations}
            checkItemStatistics={this.checkItemStatistics}
            clearItemWarnings={this.clearItemWarnings}
            refillStock={this.refillStock}
            checkForNotifications={this.checkForNotifications}
            toggleConfirmationPopup={this.toggleConfirmationPopup}
            toggleInputPopup={this.toggleInputPopup}
          />
          {this.state.showConfirmationPopup === true ? (
            <ConfirmationPopup
              togglePopup={this.toggleConfirmationPopup}
              onReturnToDashboard={this.goBackToStations}
            />
          ) : null}
          {this.state.showInputPopup === true ? (
            <InputPopup
              togglePopup={this.toggleInputPopup}
              toggleConfirmPopup={this.toggleConfirmationPopup}
              onReturnToDashboard={this.goBackToStations}
              onConfirm={this.confirmStock}
              chosenItem={this.state.chosenItem}
              chosenStation={this.state.chosenStation}
            />
          ) : null}
        </div>
      </div>
    );
  }

  toggleConfirmationPopup = () => {
    this.setState({ showConfirmationPopup: !this.state.showConfirmationPopup });
  };
  toggleInputPopup = () => {
    this.setState({ showInputPopup: !this.state.showInputPopup });
  };

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
    // this.resetActiveChilds();
    //this.resetItemChoose();
    this.resetChosenStation();
  };

  onClickStation = element => {
    this.setState({
      sideBarChosen: "Station",
      stationInfo: element
    });
    //this.resetActiveChilds();
    //this.resetItemChoose();
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
    this.setState({ chosenItem: element });
  };

  resetItemChoose = () => {
    console.log("Reset");
    this.setState({ chosenItem: null });
  };

  confirmStock = (item, station, stock) => {
    console.log(
      "update stock item " +
        item.ID +
        " from station " +
        station._ID +
        " amount " +
        stock
    );
  };

  checkItemStatistics = (station, item) => {
    this.setState({
      sideBarChosen: "Supply Statistics",
      chosenStation: station,
      chosenItem: item
    });
  };

  clearItemWarnings = (item, station) => {
    console.log(
      "No more warnings for itemid =" + item.ID + " from station " + station._ID
    );
  };

  refillStock = (item, station) => {
    console.log(
      "Refill the stock for itemid=" + item.ID + " from station " + station._ID
    );
  };
  /* functii pentru stock-ul si indexarea itemelor pe statii si pe etaje */

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

  getStationItems = station => {
    let items = this.loadItems(station.elements);
    return items;
  };

  checkForNotifications = station => {
    var items = this.getStationItems(station);

    var numberofNotif = 0;
    items.forEach(element => {
      if (element.notifications.length > 0) numberofNotif++;
    });

    if (numberofNotif === 0) return false;
    else return true;
  };

  getStationItemStock = (item, station) => {
    let stock = 0;
    let stationItems = this.getStationItems(station);
    // console.log(item.name + " " + station._name);
    for (let i = 0; i < stationItems.length; i++)
      if (stationItems[i]._name === item._name)
        stock += stationItems[i]._quantity;
    return stock;
  };
  getFloorStock = (item, floor, stations) => {
    let stock = 0;
    // console.log(item.name + " " + floor);
    for (let i = 0; i < stations.length; i++) {
      if (stations[i]._floor == floor) {
        // console.log(stations[i]._name + " " + floor + " " + stations[i]._floor);
        stock += this.getStationItemStock(item, stations[i]);
      }
    }
    return stock;
  };

  getAllItems = stations => {
    let allItems = [];
    for (let i = 0; i < stations.length; i++) {
      let currentItems = this.loadItems(stations[i].elements);
      for (let j = 0; j < currentItems.length; j++) {
        let currentID = currentItems[j].ID;
        let okToAdd = true;
        for (let k = 0; k < allItems.length; k++)
          if (allItems[k].ID === currentID) {
            // exista deja item-ul
            okToAdd = false;
            break;
          }
        if (okToAdd) allItems.push(currentItems[j]);
      }
    }
    return allItems;
  };

  getNumberOfFloors = stations => {
    let floors = 0;
    for (let i = 0; i < stations.length; i++)
      if (stations[i]._floor > floors) floors = stations[i]._floor;
    return floors;
  };

  mapItemsToStock = stations => {
    let allItems = this.getAllItems(stations);
    let nrOfFloors = this.getNumberOfFloors(stations);
    let mappedItems = new Array(nrOfFloors + 1);
    for (let i = 1; i <= nrOfFloors; i++)
      mappedItems[i] = new Array(allItems.length);

    for (let i = 0; i < allItems.length; i++) {
      for (let currentFloor = 1; currentFloor <= nrOfFloors; currentFloor++) {
        let currentStock = this.getFloorStock(
          allItems[i],
          currentFloor,
          stations
        );
        console.log(currentFloor + " " + allItems[i].name + " " + currentStock);
        mappedItems[currentFloor][i] = currentStock;
      }
    }
    return mappedItems;
  };
}

export default App;
