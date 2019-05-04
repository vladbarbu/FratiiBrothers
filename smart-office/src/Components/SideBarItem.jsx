import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBarItem extends Component {
  state = {
    element: this.props.element
  };

  getItemNotifications = () => {
    if (this.props.element.notifications.length === 0)
      return <p>No notifications</p>;

    return this.props.element.notifications.map((notification, key) => {
      return (
        <div key={key} className={"notification " + notification.type}>
          <p>
            {notification.type === "from_management" ? (
              <b>Message from management:</b>
            ) : (
              ""
            )}{" "}
            {notification.content}
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="ItemBar sideBarItem">
        <img
          src={require("./../resources/" + this.props.element.image)}
          alt=""
        />
        <div className="body">
          <div className="notifications"> {this.getItemNotifications()}</div>
          <h2>{this.props.element.name}</h2>
        </div>
        <div className="footer">
          <div
            className="button none"
            onClick={() => {
              this.props.onActionConfirmation();
            }}
          >
            <div className="content">
              <p>None left at the station</p>
            </div>
          </div>
          <div className="button few" onClick={() => this.props.onClickFew()}>
            <div className="content">
              <p>A few left</p>
              <span>requires quantity input</span>
            </div>
          </div>
          <div
            className="button discard"
            onClick={() => this.props.onClickDiscardSearch()}
          >
            <i className="material-icons">close</i>
            <div className="content">
              <p>Discard</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBarItem;
