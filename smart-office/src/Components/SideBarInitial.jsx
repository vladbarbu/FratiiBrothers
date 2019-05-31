import React, { Component } from "react";

import "../resources/styles/SideBar.scss";
import Config from "../config";
import SNotification from "../model/SNotification";


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
    return !Config.isEmpty(this.props.itemsFlat)
    && this.props.itemsFlat.hasOwnProperty(ID) ? this.props.itemsFlat[ID].name : null;
  };


  getNotificationsFromManagement = () => {
    let notifications = [];
    for (let i = 0; i < this.props.notifications.length; i++)
      if (this.props.notifications[i].type === "from_management")
        notifications.push(this.props.notifications[i]);
    return notifications;
  };

  printDate = notification => {
    return (SNotification.parseDate(notification["createdAt"]));
  };



  getFirstNotifications = (number, notifications) => {
    let data = [];
    if (number > notifications.length) number = notifications.length;
    if (number < 0) number = 2;
    for (let i = 0; i < number; i++) data.push(notifications[i]);
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

          {this.props.notifications.slice(0,3).map(notification => (
            <div key={++i} className="notification-item">
              <div className="header">
                <p>{this.getItemNameById(notification.elementId)}</p>
                <p className="time">
                  {this.printDate(notification).toString()}
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
