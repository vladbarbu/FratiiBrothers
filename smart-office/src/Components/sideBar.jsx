import React, { Component } from "react";
import SideBarHeader from "./sideBarHeader";
import Item from "./Item";
import SideBarCategory from "./SideBarCategory";
import SideBarInitial from "./SideBarInitial";

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

  getTypeOfSidebar() {
    return this.props.element === null ? (
      <SideBarInitial />
    ) : (
      <SideBarCategory
        element={this.props.element}
        onClickDiscardSearch={this.props.onClickDiscardSearch}
      />
    );
  }
  render() {
    return (
      <div id="SideBar">
        <SideBarHeader location={this.props.location} />
        {this.getTypeOfSidebar()}
        {/* <SideBarCategory element={this.props.element} /> */}
        {/* <div className="body">
          <Item item={this.props.element} />
        </div> */}
      </div>
    );
  }
}

export default SideBar;
