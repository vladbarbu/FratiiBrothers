/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";
import Config from "../config";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.sideBarReference = React.createRef();
    }




    render() {



    let descriptionItems = [
      {
        icon: "ev_station",
        text: "Context: ",
        value: this.props.chosenStation !== null  &&  !Config.isEmpty(this.props.chosenStation.name) ? this.props.chosenStation.name : "-"
      },
      {
        icon: "error",
        text: "Stock for this station: ",
        value:  this.props.chosenElement !== null  &&  !Config.isEmpty(this.props.chosenElement.quantity) ? this.props.chosenElement.quantity : "-"
      },
      { icon: "calendar_today", text: "Expected expiry date for stock: " },
      {
        icon: "error",
        text: "Stock on the entire floor: ",
        value: "2"
      },
      {
        icon: "warning",
        text: "Item warnings on this station: ",
        value:  this.props.chosenElement !== null  &&  !Config.isEmpty(this.props.chosenElement.notifications.length) ? this.props.chosenElement.notifications.length : "-"
      }
    ];
    let i = 0;
    return (
      <div className={"SideBar" + (this.props.chosenElement !== null ? " active" : "")} ref = {this.sideBarReference}  >
          <div className={"inner"}>
        <img
          src={this.props.chosenElement !== null  &&  !Config.isEmpty(this.props.chosenElement.image) ? require("./../resources/" + this.props.chosenElement.image) : ""}
          alt=""
        />
        <div className="body">
          <h2>{this.props.chosenElement !== null  &&  !Config.isEmpty(this.props.chosenElement.name) ? this.props.chosenElement.name : ""}</h2>
          <div className="description">
            {descriptionItems.map(description => (
              <div className="description-element" key={++i}>
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
                  this.props.chosenElement,
                  this.props.chosenStation
                );
                this.props.refillStock(
                  this.props.chosenElement,
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
                  this.props.chosenElement,
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
                  this.props.chosenElement
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
              <p className="no-warnings">No warnings</p>

            {/*{this.props.chosenElement.notifications.length === 0 ? (*/}
            {/*  <p className="no-warnings">No warnings</p>*/}
            {/*) : (*/}
            {/*  this.props.chosenElement.notifications.map(notification => (*/}
            {/*    <div className="notification-item" key={++i}>*/}
            {/*      <div className="header">*/}
            {/*        <p>{this.props.chosenElement.name}</p>*/}
            {/*        <p className="time">{notification.createdAt}</p>*/}
            {/*      </div>*/}
            {/*      <div className="notification-item-message">*/}
            {/*        <h6>*/}
            {/*          {notification.type === "from_station"*/}
            {/*            ? "From station: "*/}
            {/*            : null}{" "}*/}
            {/*          {notification.content}*/}
            {/*        </h6>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ))*/}
            {/*)}*/}
          </div>
        </div>
          </div>
      </div>
    );
  }
}

export default SideBar;
