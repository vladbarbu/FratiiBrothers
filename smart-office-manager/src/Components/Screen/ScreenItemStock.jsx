import React, { Component } from "react";
import SideBar from "../SideBar";

class ScreenItemStock extends Component {
  state = {
    itemTree: []
  };

  componentDidMount() {
    // console.log(this.props.stations);
    for (let i = 0; i < this.props.stations.length; i++) {
      this.mergeStations(this.state.itemTree, this.props.stations[i].elements);
    }
    this.setState({ itemTree: this.state.itemTree });
  }

  render() {
    return (
      <div className="itemStockWrapper">
        <div className="itemTree">{this.itemStock(this.state.itemTree)}</div>
        {/* {this.renderSideBar()} */}
      </div>
    );
  }
  renderSideBar() {
    return this.props.chosenItem !== null ? (
      <SideBar
        chosenItem={this.props.chosenItem}
        chosenStation={this.props.stationInfo}
        items={this.props.items}
        itemStocks={this.props.itemStocks}
        checkItemStatistics={this.props.checkItemStatistics}
        clearItemWarnings={this.props.clearItemWarnings}
        refillStock={this.props.refillStock}
        toggleConfirmationPopup={this.props.toggleConfirmationPopup}
        toggleInputPopup={this.props.toggleInputPopup}
      />
    ) : null;
  }

  renderItemStations() {}
  itemStock(itemTree) {
    return (
      <div>
        {itemTree.map((element, index) => {
          return (
            <div key={index}>
              <div
                onClick={() =>
                  element._type === "category"
                    ? this.changeActiveChild(element)
                    : this.props.itemChoose(element)
                }
              >
                <div className="element-props">
                  <p className="element-name">
                    {element._type === "category"
                      ? element._parentID === null
                        ? "Category: "
                        : "Subcategory: "
                      : "Item: "}
                    {element._name}{" "}
                    {element._type === "item" ? element._quantity : null}
                  </p>
                </div>
              </div>
              {element._childActive === true
                ? this.itemStock(element._elements)
                : null}
            </div>
          );
        })}
      </div>
    );
  }

  mergeStations(itemTree, toBeAdded) {
    for (let i = 0; i < toBeAdded.length; i++) {
      let found = false;
      for (let j = 0; j < itemTree.length; j++) {
        if (itemTree[j]._ID === toBeAdded[i].ID) {
          found = true;
          if (itemTree[j]._type === "item") {
            itemTree[j]._quantity =
              itemTree[j]._quantity + toBeAdded[i].quantity;
          } else
            this.mergeStations(itemTree[j]._elements, toBeAdded[i].elements);
          break;
        }
      }

      if (found === false) {
        let copy = JSON.parse(JSON.stringify(toBeAdded[i]));
        itemTree.push(copy);
      }
    }
  }

  changeActiveChild(element) {
    console.log("hey");
    if (element._childActive === true) element._childActive = false;
    else element._childActive = true;
    this.setState({ itemTree: this.state.itemTree });
  }
}

export default ScreenItemStock;
