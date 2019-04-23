import React, { Component } from "react";
import "./resources/styles/App.css";
import Main from "./Components/Main";
import SideBar from "./Components/sideBar";
import NavBar from "./Components/navbar";

import Element from "./model/Element";

class App extends Component {
  constructor(props) {
    super(props);

    let elements = this.loadElements();

    this.state = {
      elements: elements,
      chosen: null,
      navBarClick: false
    };
  }

  loadElements = () => {
    /**
     * Load our array of elements from the json file
     * Will be replaced by a request once networking is done
     */
    try {
      let elements = require("./resources/data/elements.json");
      if (elements) {
        let data = [];
        for (let i = 0; i < elements.length; i++) {
          data.push(new Element(elements[i]));
        }
        return data;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  render() {
    let location = {
      building: "Centric Iasi",
      floor: "Floor 5",
      table: "Table 3"
    };
    return (
      <div id="App">
        <div className="App-container">
          <div className="App-left">
            <NavBar
              onClickNavBar={this.onNavBarClick}
              onClickDiscardSearch={this.onClickDiscardSearch}
              element={this.state.chosen ? this.state.chosen : "no"}
              elements={this.state.elements}
              navBarClick={this.state.navBarClick}
              discardSearch={this.discardSearch}
            />
            <Main
              onItemClick={(this.onItemClick, this.discardSearch)}
              elements={this.state.elements}
            />
          </div>
          <div className="App-right">
            <SideBar
              element={this.state.chosen}
              location={location}
              onClickDiscardSearch={this.onClickDiscardSearch}
              onClickSearch={this.onNavBarClick}
            />
          </div>
        </div>
      </div>
    );
  }

  onItemClick = ID => {
    this.setState((state, props) => ({
      chosen: (() => {
        for (let i = 0; i < state.elements.length; i++)
          if (state.elements[i].ID === ID) {
            return state.elements[i];
          }
        return state.elements[0];
      })()
    }));
  };

  onClickDiscardSearch = () => {
    const chosen = null;

    this.setState({ chosen, navBarClick: false });
  };

  discardSearch = () => {
    this.setState({ navBarClick: false });
  };

  onNavBarClick = () => {
    this.setState({ navBarClick: true });
  };
}

export default App;
