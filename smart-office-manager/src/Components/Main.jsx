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
      checkForNotifications: this.props.checkForNotifications,
      stationInfo: this.props.stationInfo,
      goBackToStations: this.goBackToStations,
      onClickSupplyStation: this.onClickSupplyStation,
      elements: this.props.elements,
      itemChoose: this.itemChoose,
      getStationItems: this.props.getStationItems,
      chosenItem: this.props.chosenItem,
      chosenStation: this.props.stationInfo,
      items: this.props.items,
      itemStocks: this.props.itemStocks,
      checkItemStatistics: this.props.checkItemStatistics,
      clearItemWarnings: this.props.clearItemWarnings,
      refillStock: this.props.refillStock,
      toggleConfirmationPopup: this.props.toggleConfirmationPopup,
      toggleInputPopup: this.props.toggleInputPopup,
      stations: this.props.stations,
      onClickStation: this.onClickStation
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

    let itemStockProps = {
      stations: this.props.stations,
      chosenItem: this.props.chosenItem,
      itemChoose: this.itemChoose,
      onClickStation: this.onClickStation
    };

    switch (this.props.sideBarChosen) {
      case "Notifications":
        return <ScreenNotifications />;
      case "Stations":
        return <ScreenStations {...stationsProps} />;
      case "Item Stock":
        return <ScreenItemStock {...itemStockProps} />;
      case "Product Requests":
        return <ScreenRequests />;
      case "Supply Statistics":
        return <ScreenStatistics {...statisticsProps} />;

      default:
        return <div />;
    }
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
