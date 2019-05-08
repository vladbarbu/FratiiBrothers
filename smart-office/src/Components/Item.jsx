import React, { Component } from "../../node_modules/react";
import Config from "../config";
import "../resources/styles/Item.scss";

class Item extends Component {
  state = {};

  onItemClick = ID => {
    this.props.click(this.props.item.ID);
  };
  render() {
    let classList = [
      "Item",
      this.props.item.type === Config.ELEMENT_TYPE_ITEM ? "final" : "",
      this.props.item.chosen ? "chosen" : ""
    ];

    let footerIcon =
      this.props.item.type === Config.ELEMENT_TYPE_CATEGORY
        ? "drag_indicator"
        : this.props.item.chosen
        ? "close"
        : "play_arrow";

    return (
      <div
        onClick={
          this.props.sideBarCheck
            ? null
            : this.onItemClick.bind(this, this.props.item.ID)
        }
        className={classList.join(" ")}
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
            <i className="material-icons">{footerIcon}</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
