/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import SideMenuItem from "./SideMenuItem";
import "../resources/styles/SideMenu.scss";
import AppContext from "../Model/AppContext";
import Logo from "./../resources/images/logo-manager.svg";

class SideMenu extends Component {
  render() {
    return (
      <menu className={"SideMenu" + (this.props.isMobileDrawerExpanded ? " active" : "")}>

        <header>
            <div className="logo">
                <img alt="Logo" src={Logo} />
            </div>
            <div onClick={()=>{this.context.doToggleMobileDrawer("close")}} className="button menu">
                <i className="material-icons">close</i>
            </div>
        </header>
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
    this.context.doToggleMobileDrawer("close");
  };
}

SideMenu.contextType = AppContext;
export default SideMenu;
