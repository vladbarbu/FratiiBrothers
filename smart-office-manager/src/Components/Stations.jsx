import React, { Component } from "react";
import StationList from "./StationList";
import "../resources/styles/Stations.scss";
class Stations extends Component {
  render() {
    let flag = 0;
    return (
      <div className="allStations">
        <div className="breadcrumbs">
          <p>Stations</p> <i className="material-icons">arrow_right</i>
        </div>
        {this.props.stations.map(element => {
          if (flag !== element.floor) {
            flag = element.floor;
            return (
              <div className="stationFloor" key={"floor-"+element.floor}>
                <div className={"stationFloorInfo"}>
                <span className="floorID">Floor {element.floor}</span>
                <span className="numberOfStations">
                  {" "}
                  &#8226; {this.numberOfStations(flag)} stations
                </span>
                </div>
                {this.allStations(flag)}
              </div>
            );
          }
        })}
      </div>
    );
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };

  allStations(flag) {
    return (
      <div className="stations">
        {this.props.stations.map((element,index) => {
          if (element.floor === flag) {
            return (
              <StationList key={index}
                station={element}
                onClickStation={this.onClickStation}
              />
            );
          }
        })}
      </div>
    );
  }

  numberOfStations(flag) {
    let count = 0;
    {
      this.props.stations.map(element => {
        if (element.floor === flag) count += 1;
        return true;
      });
    }
    return count;
  }
}

export default Stations;
