import React, { Component } from "react";
import SideBarNotifications from "./SideBarNotifications";

import "../resources/styles/sideBar.css";

class SideBarInitial extends Component {
  state = {
    notificationsArray: [
      {
        itemName: "Paper Cup Medium",
        timeStamp: "4:20 PM",
        message:
          "We have notified the supplier and a new batch is on its way. Thank you for your patience",
        type: "normal"
      },
      {
        itemName: "Milk 3% fat",
        timeStamp: "3:45 PM",
        message:
          "We have notified the supplier. An update will be made once their answer is received.",
        type: "important"
      },
      {
        itemName: "Paper Cup Large",
        timeStamp: "3:30 PM",
        message:
          "We have notified the supplier. An update will be made once their answer is received.",
        type: "important"
      }
    ]
  };

  static getInstructions() {
    const message =
      "If your station is lacking a certain item, find it in the platform and mark it unavailable. Management will try to fix the supply issue as soon as possible.";

    return message;
  }
  static getAddItemInfo() {
    const message =
      "If the item was never made available, you can request it to be included in the station stock in the future.";
    return message;
  }
  render() {
    return (
      <div className="sideBarInitial">
        <div className="icon">
          <i className="material-icons">explore</i>
        </div>
        <h3>How it works</h3>
        <p className="subtitle">{SideBarInitial.getInstructions()}</p>
        <button
          className="button grey"
          onClick={() => this.props.onClickSearch()}
        >
          <i className="material-icons">search</i>
          <div className="content">
            <p>Search and mark unavailable</p>
            <span>or pick it from a category on the left side</span>
          </div>
        </button>

        <p className="subtitle">{SideBarInitial.getAddItemInfo()}</p>
        <button
          className="button grey"
          onClick={() => this.props.onClickRequest()}
        >
          <i className="material-icons">add</i>
          <div className="content">
            <p>Request new item</p>
          </div>
        </button>
        <div className="divider" />
        <SideBarNotifications
          notificationsArray={this.state.notificationsArray}
        />
      </div>
    );
  }
}

export default SideBarInitial;
