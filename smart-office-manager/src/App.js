import React, { Component } from "react";
import "./resources/styles/App.scss";

import NavBar from "./Components/NavBar";
import SideMenu from "./Components/SideMenu";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarChosen: "Stations"
    };
  }
  render() {
    var content = this.chosenContent;
    if (this.state.sideBarChosen === "Notifications") content = <div />;
    if (this.state.sideBarChosen === "Stations")
      content = (
        <div>
          <Main />
          <SideBar />
        </div>
      );
    if (this.state.sideBarChosen === "Item Stock") content = <div />;
    if (this.state.sideBarChosen === "Product Requests") content = <div />;
    if (this.state.sideBarChosen === "Supply Statistics") content = <div />;

    return (
      <div className="App">
        <NavBar />
        <div className="App-container">
          <SideMenu
            onClickSideBar={this.onClickSideBar}
            chosen={this.state.sideBarChosen}
          />
          {content}
        </div>
      </div>
    );
  }

  onClickSideBar = chosen => {
    this.setState({ sideBarChosen: chosen });
  };
}

export default App;
