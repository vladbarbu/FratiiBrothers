import React, { Component } from "react";
// import SideBarHeader from "./sideBarHeader";
// import SideBarCategory from "./SideBarCategory";
// import SideBarInitial from "./SideBarInitial";

import "../resources/styles/sideBar.css";
import NotificationMessage from "./NotificationMessage";

class SideBarItem extends Component {
  render() {
    return (
      <div className="ItemBar">
        <img
          src={require("./../resources/" + this.props.element.image)}
          alt=""
        />
        {/* <h4>3 other notifications have been sent to the management regarding this item in the last day.</h4> */}
        <NotificationMessage
          messageClassName="semiImportant"
          message="3 other notifications have been sent to the management regarding this item in the last day."
        />
        <NotificationMessage
          messageClassName="important"
          message="Message from management: We have notified the supplier and we are waiting for their response."
        />
        <h2>{this.props.element.name}</h2>
        <button>None left at the station</button>
        <button>A few left</button>
        <button onClick={() => this.props.onClickDiscardSearch()}>
          Discard
        </button>
      </div>
    );
  }
}

export default SideBarItem;
