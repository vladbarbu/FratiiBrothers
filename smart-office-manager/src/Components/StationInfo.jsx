import React, { Component } from "react";
import "../resources/styles/StationInfo.scss";

class StationInfo extends Component {
  render() {
    return (
      <div className="StationInfo">
        <div className="breadcrumbs">
          Stations <i className="material-icons">arrow_right</i>
          Floor {this.props.stationInfo.parentID} &#45; {" Station #"}
          {this.props.stationInfo.stationID}
        </div>
        <div className="station">
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
            </div>
          </div>
          <button onClick={() => this.props.goBackToStations()}>
            Return to stations
          </button>
          <button>View statistics for station</button>
        </div>
        <div className="itemStock">
          <b>Items</b>
        </div>
      </div>
    );
  }
}

export default StationInfo;
