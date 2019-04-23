import React, { Component } from "react";
import SideBarHeader from "./sideBarHeader";
import Item from "./Item";

import "../resources/styles/sideBar.css";

class SideBar extends Component {
  state = {
    element: this.props.element,
    actions: ["Action1", "Action2", "Action3"]
  };
  //
  // static getDerivedStateFromProps(nextProps, prevState){
  //     console.log(prevState);
  //     console.log(nextProps);
  //     if(nextProps.element !== prevState.element){
  //         return { element: nextProps.element};
  //     }
  //     else return null;
  // }

  render() {
    return (
      <div id="SideBar">
        <SideBarHeader location={this.props.location} />
        <div className="body">
          <Item item={this.props.element} />
        </div>

        <div className="actions">
          <button>{this.state.actions[0]}</button>
          <button>{this.state.actions[1]}</button>
          <button>{this.state.actions[2]}</button>
        </div>
      </div>
    );
  }
}

export default SideBar;
