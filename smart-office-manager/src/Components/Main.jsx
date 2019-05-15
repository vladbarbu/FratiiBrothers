import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBarStatistics from "./SideBarStatistics";
import ScreenItemStock from "./Screen/ScreenItemStock";
import SupplyStatistics from "./SupplyStatistics";
import ScreenNotifications from "./Screen/ScreenNotifications";
import ScreenRequests from './Screen/ScreenRequests';
import ScreenStations from './Screen/ScreenStations';


class Main extends Component {


  state = {
    localStation: null
  };

  render() {

    let stationProps = {
      checkForNotifications : this.props.checkForNotifications,
      stationInfo : this.props.stationInfo,
      goBackToStations : this.goBackToStations,
      onClickSupplyStation: this.onClickSupplyStation,
      elements : this.props.elements,
      itemChoose : this.itemChoose,
      getStationItems : this.props.getStationItems,
      chosenItem: this.props.chosenItem,
      chosenStation : this.props.stationInfo,
      items: this.props.items,
      itemStocks : this.props.itemStocks,
      checkItemStatistics  : this.props.checkItemStatistics,
      clearItemWarnings : this.props.clearItemWarnings,
      refillStock : this.props.refillStock,
      toggleConfirmationPopup : this.props.toggleConfirmationPopup,
      toggleInputPopup : this.props.toggleInputPopup,
      stations : this.props.stations,
      onClickStation : this.onClickStation,
    };



    switch (this.props.sideBarChosen) {
      case "Notifications": return <ScreenNotifications />;
      case "Stations": return (<ScreenStations {...stationProps} />);
      case "Item Stock": return <ScreenItemStock stations={this.props.stations} />;
      case "Product Requests": return <ScreenRequests />;
      case "Supply Statistics":
        return (
          <div className="SupplyStatistics">
            <SupplyStatistics
              checkForNotifications={this.props.checkForNotifications}
              stations={this.props.stations}
              onClickSupplyStation={this.onClickSupplyStation}
              chosenStation={this.props.chosenStation}
              chosenItem={this.props.chosenItem}
            />

            {this.props.chosenStation === this.state.localStation &&
            this.props.chosenStation ? (
              <SideBarStatistics
                chosenStation={this.props.chosenStation}
                chosenItem={this.props.chosenItem}
                itemChoose={this.itemChoose}
                updateStations={this.updateStations}
              />
            ) : null}
          </div>
        );

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
