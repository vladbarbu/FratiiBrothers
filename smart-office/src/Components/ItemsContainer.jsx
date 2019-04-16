import React, { Component } from "react";
import Item from "./Item";
import "../resources/styles/itemsContainer.css";

class ItemsContainer extends Component {
  render() {
    let path = require("../resources/images/unknown.png");
    let quant = 69;
    return (
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
    );
  }
}

export default ItemsContainer;
