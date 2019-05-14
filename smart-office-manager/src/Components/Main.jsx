import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";
import Stations from "./Stations";
import StationInfo from "./StationInfo";
import ItemStock from "./ItemStock";
import SupplyStatistics from "./SupplyStatistics";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.sideBarChosen) {
      case "Notifications":
        return <div />;
      case "Stations":
        return (
          <Stations
            stations={this.props.stations}
            onClickStation={this.onClickStation}
          />
        );
      case "Station":
        return (
          <div className="Station">
            <StationInfo
              stationInfo={this.props.stationInfo}
              goBackToStations={this.goBackToStations}
              elements={this.props.elements}
              itemChoose={this.itemChoose}
            />
            {this.props.chosenItem !== null ? (
              <SideBar chosenItem={this.props.chosenItem} />
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
              stations={this.props.stations}
              onClickSupplyStation={this.onClickSupplyStation}
              chosenStation={this.props.chosenStation}
            />
            {this.props.chosenStation !== null ? (
              <SideBar_Statistics
                chosenStation={this.props.chosenStation}
                chosenItem={this.props.chosenItem}
                itemChoose={this.itemChoose}
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
    this.props.onClickSupplyStation(element);
  };

  goBackToStations = () => {
    this.props.goBackToStations();
  };

  itemChoose = element => {
    this.props.itemChoose(element);
  };
}

export default Main;
