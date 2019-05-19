import React, { Component } from "react";
import "../../resources/styles/Station.scss";
class StationCard extends Component {

  render() {
    return (
      <div className={"StationCard" + (this.props.active ? " active" : "")  + (this.props.station.hasWarning ? " warn" : "") } onClick={() => {this.props.onClickStation(this.props.station);}}>
        <div className={"image"}><img alt="Station" src={this.props.station.image} className="image" /></div>
        <div className={"body"}>
          <div className={"title"}>
            <div className="icon"><i className="material-icons">ev_station</i></div>
            <p>Station #{this.props.station.name}</p>
          </div>
          <div className="info">
            <p>{this.props.station.description}</p>
          </div>
          <div className={"button"}>
            <p>Check Station</p>
          </div>
          <div className={"button mini"}><i className={"material-icons"}>arrow_forward</i></div>
        </div>
      </div>
    );
  }
}

export default StationCard;
