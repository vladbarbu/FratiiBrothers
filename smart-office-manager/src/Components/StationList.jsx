import React, { Component } from "react";
import "../resources/styles/Station.scss";
class StationList extends Component {
  state = {
    notifications: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkForNotifications(this.props.station);
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
            {this.state.notifications !== null &&
            this.state.notifications !== undefined ? (
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

  checkForNotifications(element) {
    element.elements.map(element => {
      if (element.type === "item") {
        if (element.notifications.length > 0) {
          this.setState({ notifications: true });
        }
      } else {
        this.checkForNotifications(element);
      }
    });
  }
}

export default StationList;
