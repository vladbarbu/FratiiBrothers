import React, { Component } from "react";
import "./resources/styles/App.scss";
import Station from "./Model/Station";
import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";
import ConfirmationPopup from "./Components/ConfirmationPopup";
import InputPopup from "./Components/InputPopup";
import AppContext from './Model/AppContext'
import Config from "./config";
import SideBar from "./Components/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    let location = require("./resources/data/data.json").location;
    let stations = this.loadStations();
    let items = this.getAllItems(stations);

    let mappedItems = this.mapItemsToStock(stations);


    this.state = {
      chosenElement: null,
      chosenStation: null,

      sideBarChosen: "Stations",
      location: location,
      stations: stations,
      items: items,
      mappedItems: mappedItems,
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
        <AppContext.Provider value={Config.generateAppContextValues(this)} >
      <div className="App">
        <NavBar
          onClickNotifications={this.onClickSideBar}
          goBackToStations = {this.goBackToStations}
          isReturnToStationsAvailable={ (this.state.sideBarChosen === "Stations" && this.state.chosenStation !== null) }
        />
        <div className="App-container">
          <SideMenu
            onClickSideBar={this.onClickSideBar}
            chosen={this.state.sideBarChosen}
          />
          <Main

            chosenStation={this.state.chosenStation}
            chosenElement={this.state.chosenElement}


            sideBarChosen={this.state.sideBarChosen}
            onClickStation={this.onClickStation}
            goBackToStations={this.goBackToStations}
            location={this.state.location}
            stations={this.state.stations}
            items={this.state.items}
            itemStocks={this.state.mappedItems}
            itemChoose={this.itemChoose}

            onClickSupplyStation={this.onClickSupplyStation}
            updateStations={this.updateStations}
            checkItemStatistics={this.checkItemStatistics}
            clearItemWarnings={this.clearItemWarnings}
            refillStock={this.refillStock}
            checkForNotifications={this.checkForNotifications}
            toggleConfirmationPopup={this.toggleConfirmationPopup}
            toggleInputPopup={this.toggleInputPopup}
            getStationItems={this.getStationItems}
          />



          <SideBar
              chosenElement={this.state.chosenElement}
              chosenStation={this.state.chosenStation}
              checkItemStatistics={this.checkItemStatistics}
              clearItemWarnings={this.clearItemWarnings}
              refillStock={this.refillStock}
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

                chosenElement={this.state.chosenElement}
                chosenStation={this.state.chosenStation}

              togglePopup={this.toggleInputPopup}
              toggleConfirmPopup={this.toggleConfirmationPopup}
              onReturnToDashboard={this.goBackToStations}
              onConfirm={this.confirmStock}
            />
          ) : null}
        </div>
      </div>
        </AppContext.Provider>
    );
  }

  toggleConfirmationPopup = () => {
    this.setState({ showConfirmationPopup: !this.state.showConfirmationPopup });
  };
  toggleInputPopup = () => {
    this.setState({ showInputPopup: !this.state.showInputPopup });
  };

  updateStations = elements => {
    let clone = this.state.stations;
    clone.forEach(element => {
      element.elements.forEach(element => {
        if (element === elements) element = elements;
      });
    });
    this.setState({ stations: clone });
  };

  onClickSideBar = chosen => {
    this.setState({ sideBarChosen: chosen });
    //this.resetChosenStation(); //TODO In order to keep the state of the trees (collapsed or expanded) we won't reset this
  };

  onClickStation = element => {
    this.setState({
      sideBarChosen: "Stations",
      chosenStation: element
    });
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
      chosenStation: null
    });
    this.resetActiveChildren();
    this.resetItemChoose();
  };

  //Reset the item list (Use this to get the initial list)
  resetActiveChildren = () => {
    let clone = this.state.stations;
    clone.forEach(element => {
      element.elements.forEach(element => {
        element.childActive = false;
        element.elements.forEach(element => {
          element.childActive = false;
        });
      });
    });
    this.setState({ stations: clone });
  };

  itemChoose = element => {
    this.setState({ chosenElement: element });
  };

  resetItemChoose = () => {
    console.log("Reset");
    this.setState({ chosenElement: null });
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
      chosenElement: item
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
    return this.loadItems(station.elements);
  };

  checkForNotifications = station => {
    let items = this.getStationItems(station);

    let numberofNotif = 0;
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
      if (String(stations[i]._floor) === String(floor)) {
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

        mappedItems[currentFloor][i] = this.getFloorStock(
            allItems[i],
            currentFloor,
            stations);
      }
    }
    return mappedItems;
  };




}

export default App;

