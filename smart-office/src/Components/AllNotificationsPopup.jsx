import React, { Component } from "react";

import "../resources/styles/AllNotificationsPopup.scss";

class AllNotificationsPopup extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopup();
    }
  }

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
    let parts = date.toString().split(" ");
    let hour = parts[4].toString().split(":");
    return parts[1] + " " + parts[2] + " " + hour[0] + ":" + hour[1];
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

  render() {
    let i = 0;
    return (
      <div className="AllNotificationsPopup">
        <div className="inner">
          <div className="card" ref={this.setWrapperRef}>
            <div className="container">
              <div className="header">
                <h4>Notifications</h4>
                <div
                  className="button return"
                  onClick={() => {
                    this.props.togglePopup();
                  }}
                >
                  Return
                </div>
              </div>
              <div className="notifications">
                {this.sortNotifications(this.props.notifications).map(
                  notification => (
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
                            : null}{" "}
                          {notification.content}
                        </h6>
                      </div>
                      <div className="divider" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllNotificationsPopup;
