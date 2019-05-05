/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import SideMenuItem from "./SideMenu/SideMenuItem"
import "../resources/styles/SideMenu.scss";

class SideMenu extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <menu className="SideMenu">
                <SideMenuItem item={{icon: "notifications", name : "Notifications"}} />
                <SideMenuItem item={{icon: "ev_station", name : "Stations", active : true}} />
                <SideMenuItem item={{icon: "format_list_bulleted", name : "Item Stock"}} />
                <SideMenuItem item={{icon: "folder_shared", name : "Product Requests"}} />
                <SideMenuItem item={{icon: "multiline_chart", name : "Supply Statistics"}} />


                <SideMenuItem item={{icon: "-", name : "Log Out", logout : true}} />
            </menu>
        );
    }

}

export default SideMenu;