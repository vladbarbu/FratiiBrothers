import React, { Component } from "react";
// import SideBarNotifications from "./SideBarNotifications";

import "../resources/styles/SideBar.scss";

class SideBarInitial extends Component {
  state = {
    numberOfShownNotifications: 3,
    notifications: [
      {
        itemName: "Paper Cup Medium",
        timeStamp: "4:20 PM",
        message:
          "We have notified the supplier and a new batch is on its way. Thank you for your patience",
        type: "normal"
      },
      {
        itemName: "Milk 3% fat",
        timeStamp: "3:45 PM",
        message:
          "We have notified the supplier. An update will be made once their answer is received.",
        type: "important"
      },
      {
        itemName: "Paper Cup Large",
        timeStamp: "3:30 PM",
        message:
          "We have notified the supplier. An update will be made once their answer is received.",
        type: "important"
      }
    ]
  };



  getItemNameById = ID => {
    let items = this.props.items;
    for (let i = 0; i < items.length; i++)
      if (items[i].ID === ID) return items[i].name;
    return null;
  };

  getNotificationsFromManagement = () => {
    let notifications = [];
    for (let i = 0; i < this.props.notifications.length; i++)
      if (this.props.notifications[i].type === "from_management")
        notifications.push(this.props.notifications[i]);
    return notifications;
  };

  getNotificationTime = notification => {
    const [date, time] = notification.createdAt.split(" ");
    const [day, month, year] = date.split("-");
    let newdate = year + "-" + month + "-" + day + "T" + time;
    let data = new Date(newdate);
    return data;
  };

  printDate = date => {
    return date;
    // let parts = date.toString().split(" ");
    // let hour = parts[4].toString().split(":");
    // return parts[1] + " " + parts[2] + " " + hour[0] + ":" + hour[1];
  };

  printNotificationDate = notification => {
    let date = this.getNotificationTime(notification);
    return this.printDate(date);
  };

  sortNotifications = notifications => {
    let ok = true;
    do {
      ok = true;
      for (let i = 0; i < notifications.length - 1; i++) {
        if (
          this.getNotificationTime(notifications[i]) <
          this.getNotificationTime(notifications[i + 1])
        ) {
          ok = false;
          let aux = notifications[i];
          notifications[i] = notifications[i + 1];
          notifications[i + 1] = aux;
        }
      }
    } while (!ok);
    return notifications;
  };

  getFirstNotifications = (number, notifications) => {
    let data = [];
    let sortedNotifications = this.sortNotifications(notifications);
    if (number > notifications.length) number = notifications.length;
    if (number < 0) number = 2;
    for (let i = 0; i < number; i++) data.push(sortedNotifications[i]);
    return data;
  };
  render() {
    let i = 0;
    return (
      <div className="sideBarInitial">
        <div className="icon">
          <i className="material-icons">explore</i>
        </div>
        <h3>How it works</h3>
        <p className="subtitle">{"If your station is lacking a certain item, find it in the platform and mark it unavailable. Management will try to fix the supply issue as soon as possible."}</p>
        <button
          className="button grey"
          onClick={() => this.props.onClickSearch()}
        >
          <i className="material-icons">search</i>
          <div className="content">
            <p>Search and mark unavailable</p>
            <span>or pick it from a category on the left side</span>
          </div>
        </button>

        <p className="subtitle">{"If the item was never made available, you can request it to be included in the station stock in the future."}</p>
        <button
          className="button grey"
          onClick={() => this.props.onClickRequest()}
        >
          <i className="material-icons">add</i>
          <div className="content">
            <p>Request new item</p>
          </div>
        </button>
        <div className="divider" />
        {/* <SideBarNotifications notifications={this.state.notifications} /> */}
        <div className="notifications">
          <div className="header">
            <h4>Notifications</h4>
            <button
              onClick={() => {
                this.props.onClickNotifications();
              }}
            >
              View all
            </button>
          </div>

          {this.getFirstNotifications(
            this.state.numberOfShownNotifications,
            this.getNotificationsFromManagement()
          ).map(notification => (
            <div key={++i} className="notification-item">
              <div className="header">
                <p>{this.getItemNameById(notification.itemID)}</p>
                <p className="time">
                  {this.printNotificationDate(notification).toString()}
                </p>
              </div>
              <div className="notification-item-message">
                <h6>
                  {notification.type === "from_management"
                    ? "From management: "
                    : null}
                  {notification.content}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SideBarInitial;
