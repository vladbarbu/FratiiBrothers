import React, { Component } from "../../node_modules/react";
import "../resources/styles/item.css";

class Item extends Component {
  state = {};

  onItemClick = ID => {
    this.props.click(this.props.item.ID);
  };
  render() {
    return (
      <div
        onClick={
          this.props.sideBarCheck
            ? null
            : this.onItemClick.bind(this, this.props.item.ID)
        }
        className="Item"
      >
        <div className="image">
          <img
            src={require("./../resources/" + this.props.item.image)}
            alt=""
          />
        </div>
        <div className="body">
          <p className="name">{this.props.item.name}</p>
        </div>
        <div className="footer">
          <div className="quantity">
            <i className="material-icons">label</i>
            <p>{this.props.item.quantity} items</p>
          </div>
          <div className="button">
            <i className="material-icons">drag_indicator</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
