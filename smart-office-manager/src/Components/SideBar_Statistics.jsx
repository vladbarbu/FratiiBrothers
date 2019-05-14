/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBar_Statistics extends Component {
  state = {
    stations: this.props.chosenStation.elements,
    chosen: null,
    notifications: null
  };

  render() {
    return (
      <div className="SideBar">
        <i className="material-icons">list</i>
        Station Item Stock{this.ItemStock(this.props.chosenStation)}
      </div>
    );
  }
  ItemStock(element) {
    let style = { backgroundColor: "#0DD2A3" };
    return (
      //Only category
      <div className="supplyItemStock">
        {element === this.state.chosenStation
          ? null
          : element.elements.map(element => {
              // Items and subcategory
              if (element.type !== "item") {
                return (
                  <div className="justItem supplyStock">
                    <small onClick={() => this.changeActiveChild(element)}>
                      <div className="itemText">
                        {element.type === "category" &&
                        element.parentID !== null ? (
                          <small className="itemColors">Subcategory:</small>
                        ) : null}
                        {element.type === "category" &&
                        element.parentID === null ? (
                          <small className="itemColors">Category:</small>
                        ) : null}
                        <small>{element.name}</small>
                      </div>
                    </small>
                    {element.childActive === true
                      ? this.ItemStock(element)
                      : null}
                  </div>
                );
              } else {
                return (
                  <div className="itemSidebar">
                    <div className="justItem supplyStock">
                      <small
                        onClick={() => this.changeActiveChild(element)}
                        style={
                          this.state.chosen === element
                            ? { width: "250px" }
                            : null
                        }
                      >
                        {element.type === "item" ? (
                          <img
                            src={require("./../resources/" + element.image)}
                          />
                        ) : null}
                        <div className="itemText">
                          {element.type === "item" ? (
                            <small className="itemColors">Item:</small>
                          ) : null}
                          {element.type === "category" &&
                          element.parentID !== null ? (
                            <small className="itemColors">Subcategory:</small>
                          ) : null}
                          {element.type === "category" &&
                          element.parentID === null ? (
                            <small className="itemColors">Category:</small>
                          ) : null}
                          <small>{element.name}</small>
                        </div>
                      </small>
                    </div>
                    {this.state.chosen === element ? (
                      <div className="choosenBolt">
                        <i className="material-icons">offline_bolt</i>
                      </div>
                    ) : null}

                    {element.childActive === true
                      ? this.ItemStock(element)
                      : null}
                  </div>
                );
              }
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
}

export default SideBar_Statistics;
