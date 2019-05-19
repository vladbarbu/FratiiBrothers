/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import Tree from "../Tree/Tree";
import Config from "../../config";

class SideBarStatistics extends PureComponent {

  render() {
    return (
      <div className="SideBarStatistics">
          <div className="itemTree">
              <span className={"sectionTitle"}><i className="material-icons">list</i> Station Item Stock</span>
              <Tree elements={(!Config.isEmpty(this.props.chosenStatisticsStation)) ? this.props.chosenStatisticsStation.elements : []}  />
          </div>
      </div>
    );
  }

}

export default SideBarStatistics;
