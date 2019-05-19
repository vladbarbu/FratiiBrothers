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

    let data = require("./resources/data/data.json");
    let location = data["location"];
    let stations = this.loadStations(data["stations"]);
    let items = this.getAllItems(stations);

    this.state = {
      /**
       * Store the initial dataset
       */
      initial : data,
      chosenElement: null,
      chosenStation: null,


      /**
       * To keep the tree structure separate for the Stations Screen, the Item Stock Screen and the statistics, we will se separate chosen element&station for each one
       */
      chosenStockElement : null,
      chosenStockStation : null,

      /**
       * To keep the tree structure separate for the Stations Screen, the Item Stock Screen and the statistics, we will se separate chosen element&station for each one
       */
      chosenStatisticsElement : null,
      chosenStatisticsStation : null,

      sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS,
      location: location,
      stations: stations,
      items: items,
      showConfirmationPopup: false,
      showInputPopup: false,

      /**
       * The stockHolder will represent an imaginary Station, that will hold every unique item in the platform.
       * Also, when declaring this, we will compute other "global" data items that we need (e.g. entire stock for each item)
       */
      stockHolder : this.createStockHolder(data, stations),


      /**
       *
       *
       * -------------
       *
       * DESIGN UTILITIES
       *
       * -------------
       *
       */


      isMobileDrawerExpanded : false,
      isSideBarExpanded : false,
      isSideBarStatisticsExpanded: false,

    };

  }


  loadStations = (stations) => {
    /**
     * Load our array of elements from the json file
     * Will be replaced by a request once networking is done
     */
    try {

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
          isReturnToStationsAvailable={ (this.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS && this.state.chosenStation !== null) }
        />
        <div className="App-container">
          <SideMenu
            onClickSideBar={this.onClickSideBar}
            chosen={this.state.sideBarChosen}
            isMobileDrawerExpanded ={this.state.isMobileDrawerExpanded}
          />
          <Main

            chosenStation={this.state.chosenStation}
            chosenElement={this.state.chosenElement}

            chosenStockElement = {this.state.chosenStockElement}
            chosenStockStation = {this.state.chosenStockStation}

            chosenStatisticsElement = {this.state.chosenStatisticsElement}
            chosenStatisticsStation = {this.state.chosenStatisticsStation}

            stockHolder = {this.state.stockHolder}

            isSideBarStatisticsExpanded ={this.state.isSideBarStatisticsExpanded}

            sideBarChosen={this.state.sideBarChosen}
            onClickStation={this.onClickStation}
            goBackToStations={this.goBackToStations}
            location={this.state.location}
            stations={this.state.stations}
            items={this.state.items}
            itemChoose={this.itemChoose}
            updateStations={this.updateStations}
            clearItemWarnings={this.clearItemWarnings}
            refillStock={this.refillStock}
            toggleConfirmationPopup={this.toggleConfirmationPopup}
            toggleInputPopup={this.toggleInputPopup}

          />




          <SideBar

              isSideBarExpanded ={this.state.isSideBarExpanded}
              chosenElement={this.state.chosenElement}
              chosenStation={this.state.chosenStation}
              chosenStockElement={this.state.chosenStockElement}
              chosenStockStation={this.state.chosenStockStation}
              chosenStatisticsElement={this.state.chosenStatisticsElement}
              chosenStatisticsStation={this.state.chosenStatisticsStation}

              stockHolder={this.state.stockHolder}

              sideBarChosen={this.state.sideBarChosen}


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
                chosenStockElement = {this.state.chosenStockElement}
                chosenStockStation = {this.state.chosenStockStation}
                chosenStatisticsElement = {this.state.chosenStatisticsElement}
                chosenStatisticsStation = {this.state.chosenStatisticsStation}

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

  onClickSideBar = chosen => {this.setState({ sideBarChosen: chosen });};

  onClickStation = element => {
    this.setState({sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS, chosenStation: element});
  };


  goBackToStations = () => {
    this.setState({
      sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS,
      chosenStation: null
    });

    this.resetItemChoose();
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
      if (elements[i].type === Config.ELEMENT_TYPE_CATEGORY) {
        let sub_elements = this.loadItems(elements[i].elements);
        for (let j = 0; j < sub_elements.length; j++) items.push(sub_elements[j]);
      } else {
        items.push(elements[i]);
      }
    return items;
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



  /**
   * Let's create an imaginary Station, in order to take advantage of the Tree system from inside the Station Profile.
   * ----
   * The stockHolder will represent an imaginary Station, that will hold every unique item in the platform.
   * Also, when declaring this, we will compute other "global" data items that we need (e.g. entire stock for each item)
   *
   */
  createStockHolder = (data,stations) => {


    try {
      /** As cloning a fully functional Object isn't that pretty, we will recreate the first station to us as a holder */
      data = data["stations"][0];
      console.log(data);
      data["elements"].push({
        ID : "temporary-category-for-fresh-elements",
        type : Config.ELEMENT_TYPE_CATEGORY,
        name: "Others",
        image : "images/temporary_category.png",
        elements : []
      });
      let stockHolder = new Station(data);

      for (let i = 1; i < stations.length; i++) {
        Object.keys(stations[i].elementsFlat).forEach(key => {
          if(stations[i].elementsFlat[String(key)].type === Config.ELEMENT_TYPE_ITEM) {
            if (stockHolder.elementsFlat.hasOwnProperty(String(key)) && stockHolder.elementsFlat[String(key)].type === Config.ELEMENT_TYPE_ITEM) stockHolder.elementsFlat[String(key)].quantity += stations[i].elementsFlat[String(key)].quantity;
            else {
              stockHolder.elements[stockHolder.elements.length - 1].elements.push(stations[i].elementsFlat[String(key)]);
              stockHolder.elementsFlat = Station.flattenElements(stockHolder.elements)
            }
          }

          /**
           * Too much brain-fuck if we take into account different element-trees and try to merge them.
           * E.g.
           * S1 - A->A1,A2 + B->B1
           * and
           * S2 - A->B->A1,A2,B1
           * Solution : Elements that do not exist in the first Station will not be printed.
           * Real life: return a flag for an item that won't be available, to separate it from 0-quantity-but-available items
           */
        });
      }
      stockHolder.hasWarning = stockHolder.computeWarning();
      stockHolder.uniqueItems = stockHolder.computeUniqueItems();

      console.log(stockHolder);
      return stockHolder;
    }catch (e) {
      console.error(e);
    }
    return null;
  }


}

export default App;

