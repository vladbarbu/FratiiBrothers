import React, { Component } from "react";
import "../resources/styles/Station.scss";
class StationList extends Component {
  state = {
    notifications: null
  };
  render() {
    {
      this.props.station.elements.map(element => {
        element.elements.map(element => {
          element.elements.map(element => {
            if (element.notifications.length > 0)
              if (this.state.notifications === null)
                this.setState({ notifications: true });
          });
        });
      });
    }
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
          {this.state.notifications !== null ? (
            <i
              className="material-icons stationIcon"
              style={{ backgroundColor: "red" }}
            >
              ev_station
            </i>
          ) : (
            <i className="material-icons stationIcon">ev_station</i>
          )}
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
