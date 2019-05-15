import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";
import Stations from "./Stations";
import StationInfo from "./StationInfo";
import ItemStock from "./ItemStock";
import SupplyStatistics from "./SupplyStatistics";
import Notifications from "./Notifications";

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    localStation: null
  };

  render() {
    switch (this.props.sideBarChosen) {
      case "Notifications":
        return <Notifications />;
      case "Stations":
        return (
          <Stations
            checkForNotifications={this.props.checkForNotifications}
            stations={this.props.stations}
            onClickStation={this.onClickStation}
          />
        );
      case "Station":
        return (
          <div className="Station">
            <StationInfo
              checkForNotifications={this.props.checkForNotifications}
              stationInfo={this.props.stationInfo}
              goBackToStations={this.goBackToStations}
              onClickSupplyStation={this.onClickSupplyStation}
              elements={this.props.elements}
              itemChoose={this.itemChoose}
            />
            {this.props.chosenItem !== null ? (
              <SideBar
                chosenItem={this.props.chosenItem}
                chosenStation={this.props.stationInfo}
                items={this.props.items}
                itemStocks={this.props.itemStocks}
                checkItemStatistics={this.props.checkItemStatistics}
                clearItemWarnings={this.props.clearItemWarnings}
                refillStock={this.props.refillStock}
                toggleConfirmationPopup={this.props.toggleConfirmationPopup}
                toggleInputPopup={this.props.toggleInputPopup}
              />
            ) : null}
          </div>
        );
      case "Item Stock":
        return <ItemStock elements={this.props.elements} />;
      case "Product Requests":
        return <div />;
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
              <SideBar_Statistics
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
