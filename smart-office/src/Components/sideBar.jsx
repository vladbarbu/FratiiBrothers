import React, { Component } from "react";
import SideBarHeader from "./sideBarHeader";

import "../resources/styles/sideBar.css";

class SideBar extends Component {
  state = {
    itemDescription: "PaperCups",
    buildingDescription: "Centric Iasi",
    //reminders: ["3 notifications ", "no paperscups"],
    actions: ["Action1", "Action2", "Action3"]
  };

  render() {
    const clickedItem = this.props.clickedItem;
    return (
      <div id="sideBarContainer">
        <SideBarHeader location={this.props.location} />
        <img src={clickedItem.imagePath} alt="" />
        <p>{clickedItem.name}</p>
        <h6>{clickedItem.quantity}</h6>

        {/* <div>{this.state.reminders}</div> */}
        <div>
          <button>{this.state.actions[0]}</button>
          <button>{this.state.actions[1]}</button>
          <button>{this.state.actions[2]}</button>
        </div>
      </div>
    );
  }
}

export default SideBar;
