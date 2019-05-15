/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  getItemIndex = item => {
    for (let i = 0; i < this.props.items.length; i++)
      if (this.props.items[i].ID === item.ID) return i;
    return -1;
  };

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
      {
        icon: "error",
        text: "Stock on the entire floor: ",
        value: this.props.itemStocks[this.props.chosenStation._floor][
          this.getItemIndex(this.props.chosenItem)
        ]
      },
      {
        icon: "warning",
        text: "Item warnings on this station: ",
        value: this.props.chosenItem.notifications.length
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
            <div
              className="button refill"
              onClick={() => {
                this.props.clearItemWarnings(
                  this.props.chosenItem,
                  this.props.chosenStation
                );
                this.props.refillStock(
                  this.props.chosenItem,
                  this.props.chosenStation
                );
                this.props.toggleConfirmationPopup();
              }}
            >
              <div className="content">
                <p>Refill stock</p>
                <span>and clear warnings</span>
              </div>
            </div>
            <div
              className="button edit-stock"
              onClick={this.props.toggleInputPopup}
            >
              <div className="content">
                <p>Edit stock</p>
              </div>
            </div>
            <div
              className="button clear-warnings"
              onClick={() => {
                this.props.clearItemWarnings(
                  this.props.chosenItem,
                  this.props.chosenStation
                );
                this.props.toggleConfirmationPopup();
              }}
            >
              <div className="content">
                <p>Clear warnings</p>
              </div>
            </div>
            <div
              className="button check-stats"
              onClick={() => {
                this.props.checkItemStatistics(
                  this.props.chosenStation,
                  this.props.chosenItem
                );
              }}
            >
              <div className="content">
                <p>Check item statistics</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="notifications">
            {this.props.chosenItem.notifications.length == 0 ? (
              <p className="no-warnings">No warnings</p>
            ) : (
              this.props.chosenItem.notifications.map(notification => (
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
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
