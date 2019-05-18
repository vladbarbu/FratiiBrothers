import React, { Component } from "react";
import "../resources/styles/Main.scss";
import ScreenItemStock from "./Screen/ScreenItemStock";
import ScreenNotifications from "./Screen/ScreenNotifications";
import ScreenRequests from "./Screen/ScreenRequests";
import ScreenStations from "./Screen/ScreenStations";
import ScreenStatistics from "./Screen/ScreenStatistics";

class Main extends Component {
  state = {
    localStation: null
  };

  render() {
    let stationsProps = {

        /**
         * Flow: Show stations --> *1*Choose station* --> Show tree of elements --> *2*Choose element* --> Show sidebar
         * -------
         * *1* chosenStation
         * *2* chosenElement
         *
         * TODO declare another element for the stock
         */
        chosenElement: this.props.chosenElement,
        chosenStation: this.props.chosenStation,


        /**
         * Persistent data -- TODO change later into Context API
         */

        stations: this.props.stations,
        items: this.props.items,
        itemStocks: this.props.itemStocks,

        /**
         * Functionality
         */

        checkForNotifications: this.props.checkForNotifications,
        goBackToStations: this.goBackToStations,

        onClickStation: this.onClickStation,
        onClickSupplyStation: this.onClickSupplyStation,

        getStationItems: this.props.getStationItems,
        checkItemStatistics: this.props.checkItemStatistics,
        clearItemWarnings: this.props.clearItemWarnings,
        refillStock: this.props.refillStock,


        toggleConfirmationPopup: this.props.toggleConfirmationPopup,
        toggleInputPopup: this.props.toggleInputPopup,
    };

    let statisticsProps = {
      checkForNotifications: this.props.checkForNotifications,
      stations: this.props.stations,
      onClickSupplyStation: this.onClickSupplyStation,
      chosenStation: this.props.chosenStation,
      chosenItem: this.props.chosenItem,
      itemChoose: this.itemChoose,
      updateStations: this.updateStations,
      localStation: this.state.localStation
    };



    return (
        <div className={"Main"}>
          {
            (()=>{
              switch (this.props.sideBarChosen) {
                case "Notifications":
                  return <ScreenNotifications />;
                case "Stations":
                  return <ScreenStations {...stationsProps} />;
                  case "Item Stock":
                  return <ScreenItemStock stockHolder={this.props.stockHolder} />;
                case "Product Requests":
                  return <ScreenRequests />;
                case "Supply Statistics":
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

  onClickSupplyStation = element => {
    this.setState({ localStation: element });
    this.props.onClickSupplyStation(element);
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
