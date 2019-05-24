/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../../resources/styles/Statistics.scss";
import Tree from "../Tree/Tree";
import Config from "../../config";

class SideBarStatistics extends Component {

    constructor(props){
        super(props);
        this.sideBar = React.createRef();

    }


    render() {
        return (
          <div className={"SideBarStatistics" + (this.props.hasOwnProperty("isSideBarStatisticsExpanded") ? (this.props.isSideBarStatisticsExpanded === true ? "" : " collapsed") : "") } ref={this.sideBar}>
              <div className={"toggleButton"} onClick={()=>{this.toggleSideBar()}} ><div className={"icon"}><i className={"material-icons"}>keyboard_arrow_right</i></div></div>
              <div className={"inner"}>
                  <div className={"header"}>
                      <span className={"sectionTitle"}><i className="material-icons">list</i> Station Item Stock</span>
                  </div>
                  <div className={"itemTree"}>
                      <Tree minimal={true} elements={(!Config.isEmpty(this.props.chosenStatisticsStation)) ? this.props.chosenStatisticsStation.elements : []}  />
                  </div>
              </div>
          </div>
        );
      }


    toggleSideBar = (force = null) => {
        if(force === "open") this.sideBar.current.classList.remove("collapsed");
        else if(force === "close") this.sideBar.current.classList.add("collapsed");
        else {
            if (this.sideBar.current.classList.contains("collapsed")) this.sideBar.current.classList.remove("collapsed");
            else this.sideBar.current.classList.add("collapsed");
        }
        this.props.resizeGraphComponents();
    }

}

export default SideBarStatistics;
