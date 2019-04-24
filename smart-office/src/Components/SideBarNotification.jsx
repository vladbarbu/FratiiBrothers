import React, { Component } from "react";
import NotificationMessage from "./NotificationMessage";
class SideBarNotification extends Component {
  render() {
    return (
      <div className="notification-item">
        <h5>{this.props.itemName}</h5>
        <h5>{this.props.timeStamp}</h5>
        <NotificationMessage
          messageClassName={this.props.type}
          message={this.props.message}
        />
      </div>
    );
  }
}

export default SideBarNotification;
