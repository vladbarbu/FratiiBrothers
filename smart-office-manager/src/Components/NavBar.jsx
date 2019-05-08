/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/Nav.scss";
import Logo from "./../resources/images/logo-manager.svg";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar">
        <div className="logo">
          <img alt="Logo" src={Logo} />
        </div>
        <div className="body">
          <div
            className="button notifications"
            data-warning="true"
            onClick={() => this.props.onClickNotifications("Notifications")}
          >
            <i className="material-icons"> notifications</i>
          </div>
          <div className="searchBar">
            <input placeholder="Search for a station" />
            <i className="material-icons search-icon">search</i>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
