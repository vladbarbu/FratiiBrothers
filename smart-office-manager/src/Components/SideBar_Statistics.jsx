/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBar_Statistics extends Component {
  state = {
    chosen: this.props.chosenItem
  };

  render() {
    return (
      <div className="SideBar">
        <i className="material-icons">list</i>
        Station Item Stock
        {this.ItemStock(this.props.chosenStation)}
      </div>
    );
  }
  ItemStock(element) {
    return (
      //Only category
      <div className="supplyItemStock">
        {element === this.props.chosenStation
          ? element.elements.map(element => {
              return (
                <div className="justItem supplyStock">
                  <small
                    onClick={() => this.changeActiveChild(element)}
                    style={{ border: "none" }}
                  >
                    <div className="itemText">
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
            })
          : element.elements.map(element => {
              // Items and subcategory
              if (element.type !== "item") {
                return (
                  <div className="justItem supplyStock">
                    <small
                      onClick={() => this.changeActiveChild(element)}
                      style={{ border: "none" }}
                    >
                      <div className="itemText">
                        {element.type === "category" &&
                        element.parentID !== null ? (
                          <small className="itemColors">Subcategory:</small>
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
                            alt="ok"
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
                  </div>
                );
              }
            })}
      </div>
    );
  }

  changeActiveChild = active => {
    if (active._childActive == true) active._childActive = false;
    else active._childActive = true;

    if (active.type === "item") {
      this.props.itemChoose(active);
      this.setState({ chosen: active });
    }
    this.setState({ stations: this.state.stations });
  };
}

export default SideBar_Statistics;
