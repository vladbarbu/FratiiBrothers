import React, { Component } from "react";
import "../resources/styles/item.css";

class Item extends Component {
  render() {
    return (
      <div className="Item">
        <img src={this.props.imagePath} alt="" />
        <h3 className="Name">{this.props.name}</h3>
        <p className="Quantity">{this.props.quantity} items</p>
      </div>
    );
  }
}

export default Item;
