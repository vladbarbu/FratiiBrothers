import React, { Component } from "react";

import "../resources/styles/sideBar.css";

class SideBarHeader extends Component {
  state = {
    building: "Centric Iasi",
    floor: "Floor 5",
    table: "Table 3"
  };

  render() {
    return (
      <header>
        <p>
          {this.props.location.building} . {this.props.location.floor} .{" "}
          {this.props.location.table}
        </p>
      </header>
    );
  }
}

export default SideBarHeader;
