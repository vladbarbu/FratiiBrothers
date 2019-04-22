import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
// import NavBar from "./components/navbar";
import "./App.css";
import ItemsContainer from "./components/ItemsContainer";
import SideBar from "./components/sideBar";
// import MainContainer from "./components/MainContainer";
import NavBar from "./components/navbar";
class App extends Component {
  state = {};

  render() {
    const styleTitle = {
      display: "grid"
    };
    let location = {
      building: "Centric Iasi",
      floor: "Floor 5",
      table: "Table 3"
    };
    return (
      <div id="app-wrapper">
        <div id="left-wrapper">
          <NavBar />
          <ItemsContainer />
        </div>
        <SideBar location={location} />
      </div>
    );
  }
}

export default App;
