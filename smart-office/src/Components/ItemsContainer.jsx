import React, { Component } from "react";
import Item from "./Item";
import "../resources/styles/itemsContainer.css";

class ItemsContainer extends Component {
  render() {
    let path = require("../resources/images/unknown.png");
    let quant = 69;
    return (
      <div className="ItemsContainerNav">
        <p className="text-left font-weight-bold">
          All items
          <i
            className="material-icons"
            style={{ color: "#0DD2A3", position: "relative", top: "7px" }}
          >
            arrow_right
          </i>
        </p>
        <div className="ItemsContainer">
          <Item name="coffee" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="coffee" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
          <Item name="Tea" imagePath={path} quantity={quant} />
        </div>
      </div>
    );
  }
}

export default ItemsContainer;
