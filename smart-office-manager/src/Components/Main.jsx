import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";
import Stations from "./Stations";
import StationInfo from "./StationInfo";

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
          <div>
            <Stations onClickStation={this.onClickStation} />
          </div>
        );
      case "Station":
        return (
          <div className="Station">
            <StationInfo
              stationInfo={this.props.stationInfo}
              goBackToStations={this.goBackToStations}
            />
            <SideBar />
          </div>
        );
      case "Item Stock":
        return <div />;
      case "Product Requests":
        return <div />;
      case "Supply Statistics":
        return (
          <div>
            <SideBar_Statistics />
          </div>
        );

      default:
        return <div />;
    }
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };

  goBackToStations = () => {
    this.props.goBackToStations();
  };
}

export default Main;
