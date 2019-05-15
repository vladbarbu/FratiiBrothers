/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import SideMenuItem from "./SideMenu/SideMenuItem";
import "../resources/styles/SideMenu.scss";

class SideMenu extends Component {
  render() {
    return (
      <menu className="SideMenu">
        <SideMenuItem
          item={{ icon: "notifications", name: "Notifications", active: false }}
          chosen={this.props.chosen}
          onItemClick={this.onItemClick}
        />
        <SideMenuItem
          item={{ icon: "ev_station", name: "Stations", active: false }}
          chosen={this.props.chosen}
          onItemClick={this.onItemClick}
        />
        <SideMenuItem
          item={{
            icon: "format_list_bulleted",
            name: "Item Stock",
            active: false
          }}
          chosen={this.props.chosen}
          onItemClick={this.onItemClick}
        />
        <SideMenuItem
          item={{
            icon: "folder_shared",
            name: "Product Requests",
            active: false
          }}
          chosen={this.props.chosen}
          onItemClick={this.onItemClick}
        />
        <SideMenuItem
          item={{
            icon: "multiline_chart",
            name: "Supply Statistics",
            active: false
          }}
          chosen={this.props.chosen}
          onItemClick={this.onItemClick}
        />

        <SideMenuItem item={{ icon: "-", name: "Log Out", logout: true }} />
      </menu>
    );
  }

  onItemClick = element => {
    this.props.onClickSideBar(element);
  };
}

export default SideMenu;
