import React, { Component } from "react";
import "../resources/styles/StationInfo.scss";

class StationInfo extends Component {
  render() {
    return (
      <div className="StationInfo">
        <img src={this.props.stationInfo.image} />
        <div>
          <div>
            <i className="material-icons">ev_station</i>
            <b>
              Station #{this.props.stationInfo.parentID + 64}{" "}
              {this.props.stationInfo.stationID}
            </b>

            <div className="info">
              <small>Some info</small>
            </div>
            <div className="button checkStation">
              <button>Check Station</button>
            </div>
          </div>
        </div>
        <button>Return to stations</button>
        <button>View statistics for station</button>
      </div>
    );
  }
}

export default StationInfo;
