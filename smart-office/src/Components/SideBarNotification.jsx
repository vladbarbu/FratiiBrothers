import React, { Component } from "react";
import NotificationMessage from "./NotificationMessage";
class SideBarNotification extends Component {
  render() {
    return (
      <div className="notification-item">
        <div className="header"><p>{this.props.itemName}</p><p className="time">{this.props.timeStamp}</p></div>
        <NotificationMessage
          messageClassName={this.props.type}
          message={this.props.message}
        />
      </div>
    );
  }
}

export default SideBarNotification;
