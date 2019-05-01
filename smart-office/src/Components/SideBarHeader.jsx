import React, { Component } from "react";

import "../resources/styles/SideBar.scss";

class SideBarHeader extends Component {
  state = {
    building: "Centric Iasi",
    floor: "Floor 5",
    table: "Table 3"
  };

  render() {
    return (
      <header>
        <button onClick={()=>{this.props.onToggleMobileDrawer()}} className="button menu">
          <i className="material-icons">close</i>
        </button>
        <p>
          {this.props.location.building} . {this.props.location.floor} .{" "}
          {this.props.location.table}
        </p>
      </header>
    );
  }
}

export default SideBarHeader;
