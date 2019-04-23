import React, { Component } from "react";
import "../resources/styles/item.css";

class Item extends Component {
  render() {
    const rightIconStyle = {
      transform: "rotate(90deg)",
      background: "#0dd2a3",
      color: "white",
      borderTopRightRadius: "5px",
      borderBottomLeftRadius: "5px",
      padding: "8px",
      position: "relative",
      bottom: "3px",
      left: "87px"
    };
    const leftIconStyle = { position: "relative", bottom: "4px", left: "10px" };
    const bottomTextStyle = {
      position: "relative",
      bottom: "11px",
      left: "20px"
    };
    return (
      <div className="Item">
        <img src={this.props.imagePath} alt="" />
        <h5 className="Name">{this.props.name}</h5>
        <div className="Quantity">
          <i className="material-icons-two-tone" style={leftIconStyle}>
            label
          </i>
          <strong style={bottomTextStyle}>{this.props.quantity} items</strong>
          <i className="material-icons " style={rightIconStyle}>
            drag_indicator
          </i>
        </div>
      </div>
    );
  }
}

export default Item;
