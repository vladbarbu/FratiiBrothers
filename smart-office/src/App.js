import React, { Component } from "react";
import "./resources/styles/App.css";
import Main from "./Components/Main";
import SideBar from "./Components/sideBar";
import NavBar from "./Components/navbar";
import RequestItemPopup from "./Components/RequestItemPopup";

import Element from "./model/Element";
import Notification from "./model/Notification";
// import Item from "./Components/Item";

class App extends Component {
  constructor(props) {
    super(props);

    let elements = this.loadElements();
    let notifications = this.loadNotifications(elements);
    this.state = {
      elements: elements,
      notifications: notifications,
      chosen: null,
      navBarClick: false,
      showRequestPopup: false
    };
  }

  toggleRequestPopup = () => {
    // console.log("Arata-te!");
    this.setState({ showRequestPopup: !this.state.showRequestPopup });
  };

  loadNotifications = elements => {
    let data = [];
    for (let i = 0; i < elements.length; i++)
      for (let j = 0; j < elements[i].elements.length; j++)
        for (let k = 0; k < elements[i].elements[j].elements.length; k++) {
          let notifications =
            elements[i].elements[j].elements[k]["notifications"];
          for (let n = 0; n < notifications.length; n++)
            // data.push(new Notification(notifications[n]));
            data.push(notifications[n]);
        }
    return data;
  };

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
              onClickGoBack={this.onClickGoBack}
              element={this.state.chosen}
              elements={this.state.elements}
              navBarClick={this.state.navBarClick}
              discardSearch={this.discardSearch}
            />
            <Main
              onItemClick={this.onItemClick}
              elements={this.state.elements}
              chosen={this.state.chosen}
            />
          </div>
          <div className="App-right">
            <SideBar
              element={this.state.chosen}
              location={location}
              onClickDiscardSearch={this.onClickDiscardSearch}
              onClickSearch={this.onNavBarClick}
              onClickRequest={this.toggleRequestPopup}
            />
          </div>
          {this.state.showRequestPopup ? (
            <RequestItemPopup
              togglePopup={this.toggleRequestPopup}
              onSubmit={this.handleFormSubmit}
            />
          ) : null}
        </div>
      </div>
    );
  }

  onClickGoBack = ID => {
    console.log(ID);
    if (ID !== null) {
      if (ID.parentID !== null) {
        console.log(ID.parentID);
        this.setState((state, props) => ({
          chosen: (() => {
            return this.onItemClickMaiSmechera(ID.parentID, state.elements);
          })()
        }));
      } else {
        this.setState((state, props) => ({
          chosen: (() => {
            return this.onItemClickMaiSmechera(ID.ID, state.elements);
          })()
        }));
      }
    } else {
      this.setState((state, props) => ({
        chosen: (() => {
          return this.onItemClickMaiSmechera(ID, state.elements);
        })()
      }));
    }
  };

  onItemClickMaiSmechera = (ID, V) => {
    let found = null;
    if (V != null) {
      for (let i = 0; i < V.length; i++) {
        if (V[i].ID === ID) {
          return V[i];
        } else if (V[i].type !== "item")
          found = this.onItemClickMaiSmechera(ID, V[i].elements);
        if (found !== null) break;
      }
    }
    return found;
  };

  onItemClick = ID => {
    this.setState((state, props) => ({
      chosen: (() => {
        return this.onItemClickMaiSmechera(ID, state.elements);
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
