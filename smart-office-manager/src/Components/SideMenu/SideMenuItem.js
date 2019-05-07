/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "./../../resources/styles/Nav.scss";

class SideMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.chosen === this.props.item.name)
      this.props.item.active = true;
    return (
      <div
        className="SideMenuItem"
        data-active={
          this.props.item.hasOwnProperty("active") && this.props.item.active
        }
        data-logout={
          this.props.item.hasOwnProperty("logout") && this.props.item.logout
        }
        onClick={() => this.props.onItemClick(this.props.item.name)}
      >
        <div className="icon">
          <i className="material-icons-round">{this.props.item.icon}</i>
        </div>
        <p>{this.props.item.name}</p>
      </div>
    );
  }
}

export default SideMenuItem;
