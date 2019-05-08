import React, { Component } from "react";
import "../resources/styles/Station.scss";
class StationList extends Component {
  render() {
    return (
      <a
        className="station"
        href="#"
        onClick={() => {
          this.props.onClickStation(this.props.element);
        }}
      >
        <img src={this.props.element.image} className="stationImage" />
        <div>
          <i className="material-icons">ev_station</i>
          <b>
            Station #{this.props.element.parentID + 64}{" "}
            {this.props.element.stationID}
          </b>

          <div className="info">
            <small>Some info</small>
          </div>
          <div className="button checkStation">
            <button>Check Station</button>
          </div>
        </div>
      </a>
    );
  }
}

export default StationList;
