import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";
import Stations from "./Stations";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.sideBarChosen) {
      case "Notifications":
        return <div />;
      case "Stations":
        return (
          <div>
            <Stations />
            <SideBar />
          </div>
        );
      case "Item Stock":
        return <div />;
      case "Product Requests":
        return <div />;
      case "Supply Statistics":
        return (
          <div>
            <SideBar_Statistics />
          </div>
        );
      default:
        return <div />;
    }
  }
}

export default Main;
