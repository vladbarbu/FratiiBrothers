import React, { Component } from "react";
import Tree from "../Tree/Tree";
import "../../resources/styles/Station.scss";
import Config from "./../../config";

class ScreenItemStock extends Component {


  componentDidMount() {

  }

  render() {
    return (
      <div className="ScreenItemStock">
        <div className="itemTree">
          <span className={"sectionTitle"}><i className="material-icons">list</i> Station Item Stock</span>
          <Tree elements={(!Config.isEmpty(this.props.stockHolder)) ? this.props.stockHolder.elements : []}  />
        </div>
      </div>
    );
  }



}

export default ScreenItemStock;
