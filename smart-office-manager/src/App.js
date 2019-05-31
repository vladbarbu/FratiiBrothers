import React, { Component } from "react";
import "./resources/styles/App.scss";
import Station from "./Model/Station";
import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";
import ConfirmationPopup from "./Components/ConfirmationPopup";
import AppContext from './Model/AppContext'
import Config from "./config";
import SideBar from "./Components/SideBar";
import SNotification from "./Model/SNotification";
import Modal from "./Components/Common/Modal";
import "./resources/styles/Modal.scss"
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Networking from "./Model/Networking";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * Store the initial dataset
       */
      initial : null,
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
      location: {},
      stations: [],
      items: [],
      notifications: [],
      showConfirmationPopup: false,
      showInputPopup: false,


      isSafeToUpdateUniverse : true,

      /**
       * The stockHolder will represent an imaginary Station, that will hold every unique item in the platform.
       * Also, when declaring this, we will compute other "global" data items that we need (e.g. entire stock for each item)
       */
      stockHolder : {},


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
      loading : false,
      alert : null,

      globalModals : [],
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

  loadNotifications = (stations) => {
    let notifications = [];
    for(let i = 0; i < stations.length; i++){
      let elements = stations[i].elementsFlat;
      if(!Config.isEmpty(elements))
        Object.keys(elements).forEach(key => {
            if(!Config.isEmpty(elements[key].notifications)){
              for(let j = 0; j < elements[key].notifications.length; j++) {

                let object = elements[key].notifications[j];
                object.stationId = stations[i].ID;
                object.elementId = elements[key].ID;
                notifications.push(new SNotification(object));
              }
            }
        });
    }
    return notifications;
  };
  componentDidMount() {
    console.log("App Mounted.");


    //Networking.doGetStatisticsML.bind(this)({ID:"5cec1a154bda4429340dfda4"},"2018-07-10",31);

    this.setState({
      context : Config.generateAppContextValues(this),
      loading : true
    }, ()=>{ this.state.context.doActionUniverseParse();});

    setInterval(()=>{this.state.context.doActionUniverseParse()}, 30000);

  }
  render() {
    return (
        <AppContext.Provider value={Config.generateAppContextValues(this)} >
      <div className="App">
        <NavBar
          sideBarChosen = {this.state.sideBarChosen}
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
            notifications={this.state.notifications}



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

              toggleConfirmationPopup={this.toggleConfirmationPopup}

              />






          {this.state.showConfirmationPopup === true ? (
            <ConfirmationPopup
              togglePopup={this.toggleConfirmationPopup}
              onReturnToDashboard={this.goBackToStations}
            />
          ) : null}


          <ReactCSSTransitionGroup
              transitionName="modal-animation"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
          {this.state.globalModals.map((data,index)=>{
            return data.isShowing ? <Modal key={index}  {...data} /> : null
          })}
          </ReactCSSTransitionGroup>



        </div>
        <div className={"AppLoader " + (this.state.loading ? "active" : "") }><div><p>Loading...</p></div></div>
        {
          this.state.alert !== null && !Config.isEmpty(this.state.alert.text) ?
               (<div className={"AppAlert  " + (this.state.alert.type) }><div><p>{this.state.alert.text}</p></div></div>) : null
        }
      </div>
        </AppContext.Provider>
    );
  }

  toggleConfirmationPopup = () => {
    this.setState({ showConfirmationPopup: !this.state.showConfirmationPopup });
  };



  onClickSideBar = chosen => {this.setState({ sideBarChosen: chosen });};

  onClickStation = element => {
    this.setState({sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS, chosenStation: element});
  };


  goBackToStations = () => {
    if(this.state.chosenElement) {
      let chosen = {...this.state.chosenElement};
      chosen.activeInStations = false;
      this.setState({chosenElement : chosen});
    }

    this.setState({
      stations : this.state.stations,
      sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS,
      chosenStation: null,
      chosenElement: null,
    });


  };





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
      data = {...data["stations"][0]};
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

      return stockHolder;
    }catch (e) {
      console.error(e);
    }
    return null;
  }




}

export default App;

