import React, { Component } from "react";
// import SideBarHeader from "./sideBarHeader";
// import SideBarCategory from "./SideBarCategory";
// import SideBarInitial from "./SideBarInitial";

import "../resources/styles/sideBar.css";
import NotificationMessage from "./NotificationMessage";

class SideBarItem extends Component {
  state = {
    element: this.props.element
  };

  getItemNotifications = () => {
    if (this.props.element.notifications.length === 0)
      return <p>No notifications</p>;

    let notifications = this.props.element.notifications.map(notification => (
      <p>{notification.content}</p>
    ));
    return notifications;
  };

  render() {
    return (
      <div className="ItemBar sideBarItem">
        <img
          src={require("./../resources/" + this.props.element.image)}
          alt=""
        />
        {/* <h4>3 other notifications have been sent to the management regarding this item in the last day.</h4> */
        this.getItemNotifications()}
        <h2>{this.props.element.name}</h2>
        <button>None left at the station</button>
        <button>A few left</button>
        <button onClick={() => this.props.onClickDiscardSearch()}>
          Discard
        </button>
      </div>
    );
  }
}

export default SideBarItem;
