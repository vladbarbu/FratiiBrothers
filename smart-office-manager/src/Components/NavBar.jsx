/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/NavBar.scss";
import Logo from "./../resources/images/logo-manager.svg";
import AppContext from "../Model/AppContext";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar">
        <div className="logo">
          <img alt="Logo" src={Logo} />
        </div>
        <div className="body">
            <div onClick={() => {this.context.doToggleMobileDrawer();}} className="button menu"><i className="material-icons">menu</i></div>

          {this.props.isReturnToStationsAvailable ? (
            <div className="button returnToStation" onClick={() => this.props.goBackToStations()}>
                <i className="material-icons">arrow_back</i>
                <div className={"content"}><p>Return to Stations</p></div>
            </div>
          ) : null}

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
NavBar.contextType = AppContext;
export default NavBar;
