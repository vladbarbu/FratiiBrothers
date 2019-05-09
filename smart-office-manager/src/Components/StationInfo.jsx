import React, { Component } from "react";
import "../resources/styles/StationInfo.scss";

class StationInfo extends Component {
  state = {
    stations: this.props.stationInfo.elements
  };
  render() {
    return (
      <div className="StationInfo">
        <div className="breadcrumbs">
          <a onClick={this.props.goBackToStations}>Stations</a>{" "}
          <i className="material-icons">arrow_right</i>
          Floor {this.props.stationInfo.floor} &#45; {" Station #"}
          {this.props.stationInfo.stationName}
          <i className="material-icons">arrow_right</i>
        </div>
        <div className="station">
          <img src={this.props.stationInfo.image} />
          <div>
            <div>
              <i className="material-icons">ev_station</i>
              <b>Station #{this.props.stationInfo.stationName}</b>

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
        <span>
          <i className="material-icons">list</i> Station Item Stock
        </span>
        {this.ItemStock(this.state.stations)}
      </div>
    );
  }

  ItemStock(element) {
    return (
      <div className="itemStock">
        {element === this.state.stations
          ? this.state.stations.map(element => {
              return (
                <div>
                  <small onClick={() => this.changeActiveChild(element)}>
                    {element.type === "category" && element.parentID === null
                      ? "Category:"
                      : null}

                    {element.name}
                  </small>
                  {element.childActive === true
                    ? this.ItemStock(element)
                    : null}
                </div>
              );
            })
          : element.elements.map(element => {
              return (
                <div>
                  <small onClick={() => this.changeActiveChild(element)}>
                    {element.type === "item" ? "Item:" : null}
                    {element.type === "category" ? "Subcategory:" : null}
                    {element.name}
                  </small>
                  {element.childActive === true
                    ? this.ItemStock(element)
                    : null}
                </div>
              );
            })}
      </div>
    );
  }
  changeActiveChild = active => {
    if (active.type !== "item") {
      var flag = false;
      var element = this.state.stations;
      element.map(element => {
        if (element === active) {
          flag = true;
          if (element.childActive === false) element.childActive = true;
          else element.childActive = false;
        }
      });

      if (flag === false) {
        element.map(element => {
          element.elements.map(element => {
            if (element === active) {
              flag = true;
              if (element.childActive === false) element.childActive = true;
              else element.childActive = false;
            }
          });
        });
      }

      this.setState({ stations: element });
    } else {
      this.props.itemChoose(active);
    }
  };
}

export default StationInfo;
