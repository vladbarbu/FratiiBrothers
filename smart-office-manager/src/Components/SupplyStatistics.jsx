import React, { Component } from "react";
import "../resources/styles/SupplyStatistics.scss";
class SupplyStatistics extends Component {
  render() {
    return (
      <div className="supplyStats">
        <i className="material-icons">list</i>
        Stations
        <div className="supplyStations">
          {this.props.stations.map(element => {
            return (
              <div
                className="supplyStation"
                onClick={() => this.props.onClickSupplyStation(element)}
              >
                {this.selectedMakeBig(element)}
                <small>Floor {element.floor}</small>
                <b>#{element.stationName}</b>
                {this.props.chosenStation === element ? (
                  <i className="material-icons">arrow_drop_up</i>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  selectedMakeBig = element => {
    return this.checkForNotifications(element) !== true ? (
      this.props.chosenStation === element ? (
        <i
          className="material-icons stationIcon"
          style={{ backgroundColor: "red", fontSize: "48px" }}
        >
          ev_station
        </i>
      ) : (
        <i
          className="material-icons stationIcon"
          style={{ backgroundColor: "red" }}
        >
          ev_station
        </i>
      )
    ) : this.props.chosenStation === element ? (
      <i className="material-icons stationIcon" style={{ fontSize: "48px" }}>
        ev_station
      </i>
    ) : (
      <i className="material-icons stationIcon">ev_station</i>
    );
  };

  checkForNotifications = element => {
    var flag = true;
    {
      element.elements.map(element => {
        if (flag === true)
          element.elements.map(element => {
            if (flag === true)
              element.elements.map(element => {
                if (flag === true)
                  if (element.notifications !== null)
                    if (element.notifications.length > 0) {
                      flag = false;
                    }
              });
          });
      });
    }
    return flag;
  };
}

export default SupplyStatistics;
