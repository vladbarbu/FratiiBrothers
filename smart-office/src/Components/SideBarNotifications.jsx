import React, { Component } from "react";
import SideBarNotification from "./SideBarNotification";

class SideBarNotifications extends Component {
  state = {
    notificationsArray: this.props.notificationsArray
  };

  render() {
      let i = 0;
    return (
      <div className="notifications">
        <div className="header">
            <h4>Notifications</h4>
            <button>View all</button>
        </div>
        {this.state.notificationsArray.map(notification => (
          <SideBarNotification
            key = {++i}
            itemName={notification.itemName}
            timeStamp={notification.timeStamp}
            message={notification.message}
            type={notification.type}
          />
        ))}
      </div>
    );
  }
}

export default SideBarNotifications;
