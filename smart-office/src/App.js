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
      chosen: elements[0]
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
            <NavBar />
            <Main
              onItemClick={this.onItemClick}
              elements={this.state.elements}
            />
          </div>
          <div className="App-right">
            <SideBar element={this.state.chosen} location={location} />
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
}

export default App;
