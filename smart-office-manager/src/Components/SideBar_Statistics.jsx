/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";

class SideBar_Statisctics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SideBar">
        {/* <img
          src={require("./../resources/" + this.props.element.image)}
          alt=""
        /> */}
        <div className="body">
          {/* <h2>{this.props.element.name}</h2> */}
          <h2>Station Item Stocks:</h2>
          <h3>Category</h3>
          <p>Cups</p>
          <h3>Subcategory</h3>
          <p>Papercups</p>
          <img arc="subcategory.png" alt="subcategory" />
        </div>
      </div>
    );
  }
}

export default SideBar_Statisctics;
