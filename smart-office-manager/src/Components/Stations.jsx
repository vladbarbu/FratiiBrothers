import React, { Component } from "react";
import StationList from "./StationList";
import "../resources/styles/Stations.scss";
class Stations extends Component {
  state = {
    element: [
      {
        floorID: 1,
        stations: [
          {
            stationID: 1,
            parentID: 1,
            image:
              "http://www.iida.org/resources/content/9/3/9/5/images/42_resizedc800x530.jpg"
          },
          {
            stationID: 2,
            parentID: 1,
            image:
              "http://www.iida.org/resources/content/9/3/9/5/images/42_resizedc800x530.jpg"
          },
          {
            stationID: 3,
            parentID: 1,
            image:
              "http://www.iida.org/resources/content/9/3/9/5/images/42_resizedc800x530.jpg"
          }
        ]
      },
      {
        floorID: 2,
        stations: [
          {
            stationID: 1,
            parentID: 2,
            image:
              "http://www.iida.org/resources/content/9/3/9/5/images/42_resizedc800x530.jpg"
          },
          {
            stationID: 2,
            parentID: 2,
            image:
              "http://www.iida.org/resources/content/9/3/9/5/images/42_resizedc800x530.jpg"
          }
        ]
      }
    ]
  };

  render() {
    return (
      <div className="allStations">
        <div className="breadcrumbs">
          Stations <i className="material-icons">arrow_right</i>
        </div>
        {this.state.element.map(element => {
          return (
            <div>
              <span className="floorID">Floor {element.floorID}</span>
              <span className="numberOfStations">
                &#8226;
                {element.stations.length} stations
              </span>
              <div className="stationList">
                {element.stations.map(element => {
                  return (
                    <StationList
                      element={element}
                      onClickStation={this.onClickStation}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };
}

export default Stations;
