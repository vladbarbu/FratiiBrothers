import React, { Component } from "react";

import "../resources/styles/SideBar.scss";
import AppContext from "../model/AppContext";
import Config from "../config";


class SideBarHeader extends Component {




    render() {
      let station = {
          building: "Centric Iasi",
          floor: "Floor "+ (Config.isEmpty(this.context.station.floor) ? "-" :  this.context.station.floor),
          table: "Station "+ (Config.isEmpty(this.context.station.name) ? "-" :  this.context.station.name),
      };
    return (
      <header>
        <button onClick={()=>{this.props.onToggleMobileDrawer()}} className="button menu">
          <i className="material-icons">close</i>
        </button>
        <p>
          {station.building} . {station.floor} .{" "}
          {station.table}
        </p>
      </header>
    );
  }
}

SideBarHeader.contextType = AppContext;
export default SideBarHeader;
