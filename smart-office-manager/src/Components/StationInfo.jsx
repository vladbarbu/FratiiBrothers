import React, { Component } from "react";
import "../resources/styles/StationInfo.scss";

class StationInfo extends Component {
  state = {
    stations: this.props.stationInfo.elements,
    chosen: null,
    notifications: null,
    numberOfItems: this.searchItems()
  };

  componentDidMount() {
    console.log(this.props.checkForNotifications(this.props.stationInfo));
    this.setState({
      notifications: this.props.checkForNotifications(this.props.stationInfo)
    });
  }
  render() {
    let i = 0;
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
          <img src={this.props.stationInfo.image} alt="ok" />
          <div>
            <div>
              {this.state.notifications === true ? (
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
                <small style={{ color: "#0DD2A3" }}>
                  <i className="material-icons">label</i>
                  {this.state.numberOfItems} unique items
                </small>
              </div>
            </div>
          </div>
          <small
            onClick={() => this.props.goBackToStations()}
            className="returnButton"
          >
            Return to stations
          </small>
          <small
            className="viewButton"
            onClick={() =>
              this.props.onClickSupplyStation(this.props.stationInfo)
            }
          >
            View statistics for station
          </small>
        </div>
        <span>
          <i className="material-icons">list</i> Station Item Stock
        </span>
        <div className="forScroll" style={{ overflow: "auto" }}>
          {this.ItemStock(this.state.stations)}
        </div>
      </div>
    );
  }

  ItemStock(element) {
    // var numberOfItems = 0;
    let i = 0;
    let style = { backgroundColor: "#0DD2A3" };
    return (
      //Only category
      <div className="itemStock">
        {element === this.state.stations
          ? this.state.stations.map(element => {
              return (
                <div className="categoryItem" key={++i}>
                  <small onClick={() => this.changeActiveChild(element)}>
                    <img
                      src={require("./../resources/" + element.image)}
                      alt="ok"
                    />
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
                  {/* {this.ItemStock(element)}*/}
                </div>
              );
            })
          : element.elements.map(element => {
              // Items and subcategory
              return (
                <div className="justItem" key={++i}>
                  <small onClick={() => this.changeActiveChild(element)}>
                    <i className="material-icons subdirectory">
                      subdirectory_arrow_right
                    </i>
                    <img
                      src={require("./../resources/" + element.image)}
                      alt="ok"
                    />
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
                  {/*{element.type !== "item" ? this.ItemStock(element) : null}*/}
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

  searchItems() {
    var numberOfItems = 0;
    this.props.stationInfo.elements.map(element => {
      element.elements.map(element => {
        element.elements.map(element => {
          numberOfItems++;
        });
      });
    });
    return numberOfItems;
  }
}

export default StationInfo;
