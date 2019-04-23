import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ItemsContainer from "./Components/ItemsContainer";
import SideBar from "./Components/sideBar";

import NavBar from "./Components/navBar";
class App extends Component {
  state = {};

  render() {
    let location = {
      building: "Centric Iasi",
      floor: "Floor 5",
      table: "Table 3"
    };
    let clickedItem = {
      name: "Cups",
      imagePath: require("./resources/images/dummy.png"),
      quantity: 20
    };
    return (
      <div id="app-wrapper">
        <div id="left-wrapper">
          <NavBar />
          <ItemsContainer />
        </div>
        <SideBar location={location} clickedItem={clickedItem} />
      </div>
    );
  }
}

export default App;
