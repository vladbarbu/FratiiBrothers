import React, { Component } from "react";
import "../resources/styles/Station.scss";
class StationList extends Component {
  state = {
    notifications: null
  };

  componentDidMount() {
    this.setState({
      notifications: this.props.checkForNotifications(this.props.station)
    });
  }

  render() {
    return (
      <div
        className="Station"
        onClick={() => {
          this.props.onClickStation(this.props.station);
        }}
      >
        <div className="image">
          <img alt="Station" src={this.props.station.image} className="image" />
        </div>

        <div className={"body"}>
          <div className={"title"}>
            {this.state.notifications !== false ? (
              <div className="icon">
                <i
                  className="material-icons"
                  style={{ backgroundColor: "red" }}
                >
                  ev_station
                </i>
              </div>
            ) : (
              <div className="icon">
                <i className="material-icons">ev_station</i>
              </div>
            )}
            <p>Station #{this.props.station.stationName}</p>
          </div>
          <div className="info">
            <p>Some info</p>
          </div>
          <div className="button">
            <p>Check Station</p>
          </div>
        </div>
      </div>
    );
  }
}

export default StationList;
