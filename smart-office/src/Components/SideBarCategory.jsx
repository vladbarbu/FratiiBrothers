import React, { Component } from "react";
import Item from "./Item";

import "../resources/styles/SideBar.scss";

class SideBarCategory extends Component {
  state = {
    element: this.props.element,
    actions: ["Action1", "Action2", "Action3"]
  };

  static getInstructions() {
    return "Click through the categories until you find the item you are looking for, or find it with the search feature on the top of the screen.";

  }
  render() {
    return (
      <div className="sideBarCategory">
          <Item item={this.props.element} sideBarCheck={true} />
        <div className="divider"/>
          <h3>How it works</h3>
          <p className="subtitle">{SideBarCategory.getInstructions()}</p>
         <div className="spacer"/>
          <div className="button grey"  onClick={() => this.props.onClickDiscardSearch()}>
            <i className="material-icons">close</i>
            <div className="content">
              <p>Discard Search</p>
            </div>
          </div>
      </div>
    );
  }
}

export default SideBarCategory;
