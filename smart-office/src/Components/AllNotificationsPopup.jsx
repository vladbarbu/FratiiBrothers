import React, { Component } from "react";


import "../resources/styles/AllNotificationsPopup.scss";
import Config from "../config";
import SNotification from "../model/SNotification";

class AllNotificationsPopup extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
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
    return !Config.isEmpty(this.props.itemsFlat)
        && this.props.itemsFlat.hasOwnProperty(ID) ? this.props.itemsFlat[ID].name : null;
  };


  printDate = notification => {
    return (SNotification.parseDate(notification["createdAt"]));
  };


  sortNotifications = notifications => {
    let ok = true;
    do {
      ok = true;
      for (let i = 0; i < notifications.length - 1; i++) {
        if (
          this.printDate(notifications[i]) <
          this.printDate(notifications[i + 1])
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
                        <p>{this.getItemNameById(notification.elementId)}</p>
                        <p className="time">
                          {this.printDate(notification).toString()}
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
