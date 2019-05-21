import React, { Component } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarCategory from "./SideBarCategory";
import SideBarInitial from "./SideBarInitial";
import SideBarItem from "./SideBarItem";

import "../resources/styles/SideBar.scss";

class SideBar extends Component {
  state = {
    element: this.props.element,
    actions: ["Action1", "Action2", "Action3"]
  };

  getTypeOfSidebar() {
    return this.props.element === null ? (
      <SideBarInitial
        itemsFlat = {this.props.itemsFlat}
        onClickSearch={this.props.onClickSearch}
        onClickRequest={this.props.onClickRequest}
        notifications={this.props.notifications}
        items={this.props.items}
        onClickNotifications={this.props.onClickNotifications}
      />
    ) : this.props.element.type === "item" ? (
      <SideBarItem
        itemsFlat = {this.props.itemsFlat}
        element={this.props.element}
        onClickDiscardSearch={() => {
          this.props.onClickDiscardSearch();
          this.props.onToggleMobileDrawer("close");
        }}
        onActionConfirmation={this.props.onActionConfirmation}
        onClickFew={this.props.onClickFew}
      />
    ) : (
      <SideBarCategory
        itemsFlat = {this.props.itemsFlat}
        element={this.props.element}
        onClickDiscardSearch={() => {
          this.props.onClickDiscardSearch();
          this.props.onToggleMobileDrawer("close");
        }}
      />
    );
  }
  render() {
    return (
      <div id="SideBar">
        <SideBarHeader
          onToggleMobileDrawer={this.props.onToggleMobileDrawer}
        />
        {this.getTypeOfSidebar()}
      </div>
    );
  }
}

export default SideBar;
