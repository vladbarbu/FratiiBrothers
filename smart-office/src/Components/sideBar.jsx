import React, { Component } from "react";
import SideBarHeader from "./sideBarHeader";

import "../resources/styles/sideBar.css";

class SideBar extends Component {
  state = {
    itemDescription: "PaperCups",
    buildingDescription: "Centric Iasi",
    reminders: ["3 notifications ", "no paperscups"],
    actions: ["Action1", "Action2", "Action3"]
  };

  render() {
    return (
      <div id="sideBarContainer">
        <SideBarHeader location={this.props.location} />
        <div>{this.state.itemDescription}</div>
        <div>{this.state.reminders}</div>
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
