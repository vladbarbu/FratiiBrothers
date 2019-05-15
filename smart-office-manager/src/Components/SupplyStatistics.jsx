import React, { Component } from "react";
import "../resources/styles/SupplyStatistics.scss";
import Calendar from "./Calendar";

class SupplyStatistics extends Component {
  state = {
    pressed: "Calendar"
  };
  render() {
    let i = 0;
    return (
      <div className="supplyStats">
        <i className="material-icons">list</i>
        Stations
        <div className="supplyStations">
          {this.props.stations.map(element => {
            return (
              <div
                className="supplyStation"
                key={++i}
                onClick={() => this.props.onClickSupplyStation(element)}
              >
                {this.selectedMakeBig(element)}
                <small>Floor {element.floor}</small>
                <b>#{element.stationName}</b>
                {this.props.chosenStation === element ? (
                  <i className="material-icons underStation">arrow_drop_up</i>
                ) : null}
              </div>
            );
          })}
        </div>
        <div>
          <i class="material-icons">show_chart</i>
          Supply Statistics
        </div>
        <div className="supplyButtons">
          {this.state.pressed === "Calendar" ? (
            <small
              className="supplyButton"
              onClick={() => this.setPressed("Calendar")}
              style={{ backgroundColor: "#F9E816" }}
            >
              <i class="material-icons">calendar_today</i>Supply Calendar
            </small>
          ) : (
            <small
              className="supplyButton"
              onClick={() => this.setPressed("Calendar")}
            >
              <i class="material-icons">calendar_today</i>Supply Calendar
            </small>
          )}

          {this.state.pressed === "Graph" ? (
            <small
              className="supplyButton"
              onClick={() => this.setPressed("Graph")}
              style={{ backgroundColor: "#F9E816" }}
            >
              {" "}
              <i class="material-icons">graphic_eq</i>Supply Graph
            </small>
          ) : (
            <small
              className="supplyButton"
              onClick={() => this.setPressed("Graph")}
            >
              {" "}
              <i class="material-icons">graphic_eq</i>Supply Graph
            </small>
          )}
        </div>
        <small>
          {this.props.chosenItem !== null
            ? this.selectedItem(this.props.chosenItem)
            : "Please pick an item"}
        </small>
        {this.state.pressed === "Calendar" ? (
          this.props.chosenItem === null ? (
            <Calendar className="supplyCalendar" style={{ opacity: "0.3" }} />
          ) : (
            <Calendar className="supplyCalendar" />
          )
        ) : null}
      </div>
    );
  }

  setPressed = element => {
    this.setState({ pressed: element });
  };

  selectedItem = element => {
    return (
      <div className="selectedItem">
        <div className="justItem supplyStock">
          <small
            onClick={() => this.changeActiveChild(element)}
            style={this.state.chosen === element ? { width: "250px" } : null}
          >
            {element.type === "item" ? (
              <img src={require("./../resources/" + element.image)} alt="ok" />
            ) : null}
            <div className="itemText">
              {element.type === "item" ? (
                <small className="itemColors">Item:</small>
              ) : null}
              {element.type === "category" && element.parentID !== null ? (
                <small className="itemColors">Subcategory:</small>
              ) : null}
              {element.type === "category" && element.parentID === null ? (
                <small className="itemColors">Category:</small>
              ) : null}
              <small>{element.name}</small>
            </div>
          </small>
        </div>
      </div>
    );
  };

  selectedMakeBig = element => {
    var hasNotifications = this.props.checkForNotifications(element);
    console.log(hasNotifications);
    return hasNotifications === true ? (
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
}

export default SupplyStatistics;
