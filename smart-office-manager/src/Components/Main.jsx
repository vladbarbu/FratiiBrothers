import React, { Component } from "react";
import "../resources/styles/Main.scss";
import ScreenItemStock from "./Screen/ScreenItemStock";
import ScreenNotifications from "./Screen/ScreenNotifications";
import ScreenRequests from "./Screen/ScreenRequests";
import ScreenStations from "./Screen/ScreenStations";
import ScreenStatistics from "./Screen/ScreenStatistics";
import Config from "../config";

class Main extends Component {
  state = {
    localStation: null
  };

  render() {

    let notificationsProps = {
      notifications: this.props.notifications,
      items: this.props.items,
      stations: this.props.stations,
      stockHolder : this.props.stockHolder
    };

    let stationsProps = {

        /**
         * Flow: Show stations --> *1*Choose station* --> Show tree of elements --> *2*Choose element* --> Show sidebar
         * -------
         * *1* chosenStation
         * *2* chosenElement
         *
         */
        chosenElement: this.props.chosenElement,
        chosenStation: this.props.chosenStation,

        /**
         * Persistent data -- TODO change later into Context API
         */

        stations: this.props.stations,
        stockHolder : this.props.stockHolder,

        /**
         * Functionality
         */

        goBackToStations: this.goBackToStations,

        onClickStation: this.onClickStation,
        clearItemWarnings: this.props.clearItemWarnings,
        refillStock: this.props.refillStock,


        toggleConfirmationPopup: this.props.toggleConfirmationPopup,
        toggleInputPopup: this.props.toggleInputPopup,
    };

    let stockProps = {
        chosenStockElement : this.props.chosenStockElement,
        chosenStockStation : this.props.chosenStockStation,
        stockHolder : this.props.stockHolder
    };

    let statisticsProps = {

        chosenStatisticsElement : this.props.chosenStatisticsElement,
        chosenStatisticsStation : this.props.chosenStatisticsStation,

        stockHolder : this.props.stockHolder,

        isSideBarStatisticsExpanded : this.props.isSideBarStatisticsExpanded,
    };



    return (
        <div className={"Main"}>
          {
            (()=>{
              switch (this.props.sideBarChosen) {
                case Config.SCREEN_IDENTIFIER_NOTIFICATIONS:
                  return <ScreenNotifications {...notificationsProps}/>;
                case Config.SCREEN_IDENTIFIER_STATIONS:
                  return <ScreenStations {...stationsProps} />;
                  case  Config.SCREEN_IDENTIFIER_STOCK:
                  return <ScreenItemStock {...stockProps}  />;
                case  Config.SCREEN_IDENTIFIER_REQUESTS:
                  return <ScreenRequests />;
                case  Config.SCREEN_IDENTIFIER_STATISTICS:
                  return <ScreenStatistics {...statisticsProps} />;
                default:
                  return <div />;
              }
            })()
          }
        </div>
    )
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };


  goBackToStations = () => {
    this.props.goBackToStations();
  };

  itemChoose = element => {
    this.props.itemChoose(element);
  };

  updateStations = element => {
    this.props.updateStations(element);
  };
}

export default Main;
