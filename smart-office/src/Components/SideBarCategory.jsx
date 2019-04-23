import React, { Component } from "react";
import SideBarHeader from "./sideBarHeader";
import Item from "./Item";

import "../resources/styles/sideBar.css";

class SideBarCategory extends Component {
  state = {
    element: this.props.element,
    actions: ["Action1", "Action2", "Action3"]
  };

  getInstructions() {
    const message =
      "Click throught the categories until you find the item you are looking for, or find it with the search feature on the top of the screen.";
    return message;
  }
  render() {
    return (
      <div id="SideBar">
        <div className="body">
          <Item item={this.props.element} />
          <h2>How it works</h2>
          <h5>{this.getInstructions()}</h5>
          <button onClick={() => this.props.onClickDiscardSearch()}>
            Discard Search
          </button>
        </div>
      </div>
    );
  }
}

export default SideBarCategory;
