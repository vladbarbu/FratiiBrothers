import React, { Component } from "react";
import "../resources/styles/StationInfo.scss";

class StationInfo extends Component {
  state = {
    stations: this.props.stationInfo.elements,
    chosen: null,
    notifications: null
  };
  render() {
    this.checkNotifications();
    return (
      <div className="StationInfo">
        <div className="breadcrumbs">
          <a onClick={this.props.goBackToStations}>Stations</a>{" "}
          <i className="material-icons">arrow_right</i>
          Floor {this.props.stationInfo.floor} &#45; {" Station #"}
          {this.props.stationInfo.stationName}
          <i className="material-icons">arrow_right</i>
        </div>
        <div className="stationInfo">
          <img src={this.props.stationInfo.image} />
          <div>
            <div>
              {this.state.notifications !== null ? (
                <i
                  className="material-icons stationIcon"
                  style={{ backgroundColor: "red" }}
                >
                  ev_station
                </i>
              ) : (
                <i
                  className="material-icons stationIcon"
                  style={{ backgroundColor: "#0dd2a3" }}
                >
                  ev_station
                </i>
              )}
              <b>Station #{this.props.stationInfo.stationName}</b>

              <div className="info">
                <small>Some info</small>
              </div>
            </div>
          </div>
          <button onClick={() => this.props.goBackToStations()}>
            Return to stations
          </button>
          <button
            onClick={() =>
              this.props.onClickSupplyStation(this.props.stationInfo)
            }
          >
            View statistics for station
          </button>
        </div>
        <span>
          <i className="material-icons">list</i> Station Item Stock
        </span>
        {this.ItemStock(this.state.stations)}
      </div>
    );
  }

  ItemStock(element) {
    let style = { backgroundColor: "#0DD2A3" };
    return (
      //Only category
      <div className="itemStock">
        {element === this.state.stations
          ? this.state.stations.map(element => {
              return (
                <div className="categoryItem">
                  <small onClick={() => this.changeActiveChild(element)}>
                    <img src={require("./../resources/" + element.image)} />
                    <div className="itemText">
                      {element.type === "category" && element.parentID === null
                        ? "Category:"
                        : null}

                      {element.name}
                    </div>
                  </small>
                  {element.childActive === true
                    ? this.ItemStock(element)
                    : null}
                </div>
              );
            })
          : element.elements.map(element => {
              // Items and subcategory
              return (
                <div className="justItem">
                  <small onClick={() => this.changeActiveChild(element)}>
                    <i class="material-icons subdirectory">
                      subdirectory_arrow_right
                    </i>
                    <img src={require("./../resources/" + element.image)} />
                    <div className="itemText">
                      {element.type === "item" ? "Item:" : null}
                      {element.type === "category" ? "Subcategory:" : null}

                      {element.name}
                      {element.type === "item" ? ( //Items stock/warnings/notifications
                        <div className="itemNotification">
                          <i className="material-icons">layers</i>
                          {element.quantity} in stock
                          {element.notification !== null ? (
                            element.notifications.length > 0 ? (
                              <b className="warningBadge">New warnings</b>
                            ) : null
                          ) : null}
                        </div>
                      ) : null}
                      {element.type === "item" ? (
                        this.state.chosen === element ? (
                          <i
                            className="material-icons itemButton"
                            style={style}
                          >
                            arrow_forward
                          </i>
                        ) : (
                          <i className="material-icons itemButton">
                            arrow_forward
                          </i>
                        )
                      ) : null}
                    </div>
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
      this.setState({ chosen: active });
    }
  };

  checkNotifications() {
    this.props.stationInfo.elements.map(element => {
      element.elements.map(element => {
        element.elements.map(element => {
          if (element.notifications.length > 0)
            if (this.state.notifications === null)
              this.setState({ notifications: true });
        });
      });
    });
  }
}

export default StationInfo;
