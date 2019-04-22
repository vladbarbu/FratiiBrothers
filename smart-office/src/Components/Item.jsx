import React, { Component } from "react";
import "../resources/styles/item.css";

class Item extends Component {
  render() {
    const iconStyle = { transform: "rotate(90deg)" };
    return (
      <div className="Item">
        <img src={this.props.imagePath} alt="" />
        <h3 className="Name">{this.props.name}</h3>
        <div className="Quantity">
          <i className="material-icons">label</i>
          {this.props.quantity} items
          <i className="material-icons" style={iconStyle}>
            drag_indicator
          </i>
        </div>
      </div>
    );
  }
}

export default Item;
