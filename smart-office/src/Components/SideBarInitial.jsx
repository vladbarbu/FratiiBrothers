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

  getInstructions() {
    const message =
      "If your station is lacking a certain item, find it in the platform and mark it unavailable. Management will try to fix the supply issue as soon as possible.";

    return message;
  }
  getAddItemInfo() {
    const message =
      "If the item was never made available, you can request it to be included in the station stock in the future.";
    return message;
  }
  render() {
    return (
      <div>
        <h3>How it works</h3>
        <br />
        <h6>{this.getInstructions()}</h6>
        <button onClick={() => this.props.onClickSearch()}>
          Search and mark unavailable
        </button>
        <h6>{this.getAddItemInfo()}</h6>
        <button>Request new item</button>
        <SideBarNotifications
          notificationsArray={this.state.notificationsArray}
        />
      </div>
    );
  }
}

export default SideBarInitial;
