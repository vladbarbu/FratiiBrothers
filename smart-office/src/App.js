import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
// import NavBar from "./Components/navbar";
import "./App.css";
import ItemsContainer from "./Components/ItemsContainer";
import SideBar from "./Components/sideBar";
// import MainContainer from "./components/MainContainer";
import NavBar from "./Components/navBar";
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
