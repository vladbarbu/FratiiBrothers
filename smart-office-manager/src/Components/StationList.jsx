import React, { Component } from "react";
import "../resources/styles/Station.scss";
class StationList extends Component {
  render() {
    return (
      <a
        className="station"
        href="#"
        onClick={() => {
          this.props.onClickStation(this.props.station);
        }}
      >
        <img src={this.props.station.image} className="stationImage" />
        <div>
          <i className="material-icons">ev_station</i>
          <b>Station #{this.props.station.stationName}</b>

          <div className="info">
            <small>Some info</small>
          </div>
          <div className="small checkStation">
            <small>Check Station</small>
          </div>
        </div>
      </a>
    );
  }
}

export default StationList;
