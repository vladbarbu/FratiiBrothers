import React, { Component } from "react";
import SideBarNotification from "./SideBarNotification";

class SideBarNotifications extends Component {
  state = {
    notificationsArray: this.props.notificationsArray
  };

  render() {
    return (
      <div>
        <h3>Notifications</h3>
        <button>View all</button>
        {this.state.notificationsArray.map(notification => (
          <SideBarNotification
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
