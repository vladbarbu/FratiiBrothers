import React, { Component } from "react";
import StationList from "./StationList";
import "../resources/styles/Stations.scss";
class Stations extends Component {
  render() {
    return (
      <div className="allStations">
        <div className="breadcrumbs">
          Stations <i className="material-icons">arrow_right</i>
        </div>
      </div>
    );
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };
}

export default Stations;
