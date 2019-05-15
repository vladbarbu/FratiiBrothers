/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let descriptionItems = [
      {
        icon: "ev_station",
        text: "Context: ",
        value: this.props.chosenStation._name
      },
      {
        icon: "error",
        text: "Stock for this station: ",
        value: this.props.chosenItem._quantity
      },
      { icon: "calendar_today", text: "Expected expiry date for stock: " },
      { icon: "error", text: "Stock on the entire floor: " },
      { icon: "warning", text: "Item warnings on this station: " }
    ];

    let notifications = [
      {
        ID: "123",
        type: "from_station",
        content: "No more items of this type are available.",
        createdAt: "06-05-2019 15:10:00",
        itemID: 71
      },
      {
        ID: "234",
        type: "from_station",
        content: "Only 5 items of this kind left.",
        createdAt: "06-05-2019 16:20:00",
        itemID: 70
      }
    ];
    return (
      <div className="SideBar">
        <img
          src={require("./../resources/" + this.props.chosenItem.image)}
          alt=""
        />
        <div className="body">
          <h2>{this.props.chosenItem.name}</h2>
          <div className="description">
            {descriptionItems.map(description => (
              <div className="description-element">
                <div className="icon">
                  <i className="material-icons-round">{description.icon} </i>
                </div>
                <p>
                  {description.text} {description.value}
                </p>
              </div>
            ))}
          </div>
          <div className="buttons">
            <div className="button refill">
              <div className="content">
                <p>Refill stock</p>
                <span>and clear warnings</span>
              </div>
            </div>
            <div className="button edit-stock">
              <div className="content">
                <p>Edit stock</p>
              </div>
            </div>
            <div className="button clear-warnings">
              <div className="content">
                <p>Clear warnings</p>
              </div>
            </div>
            <div className="button check-stats">
              <div className="content">
                <p>Check item statistics</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="notifications">
            {notifications.map(notification => (
              <div className="notification-item">
                <div className="header">
                  <p>{notification.itemID}</p>
                  <p className="time">{notification.createdAt}</p>
                </div>
                <div className="notification-item-message">
                  <h6>
                    {notification.type === "from_station"
                      ? "From station: "
                      : null}{" "}
                    {notification.content}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
