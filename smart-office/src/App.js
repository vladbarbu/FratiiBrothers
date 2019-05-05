import React, { Component } from "react";
import Config from "./config";
import "./resources/styles/App.scss";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import RequestItemPopup from "./Components/RequestItemPopup";
import Element from "./model/Element";
import ActionItemPopupConfirmation from "./Components/ActionItemPopupConfirmation";
import FewLeftPopup from "./Components/FewLeftPopup";

class App extends Component {
  constructor(props) {
    super(props);

    let elements = this.loadElements();
    let notifications = this.loadNotifications(elements);

    this.state = {
      drawer_visible: false,
      elements: elements,
      notifications: notifications,
      chosen: null,
      navBarClick: false,
      showRequestPopup: false,
      showFewLeftPopup: false,
      showActionConfirmationPopup: false,
      timeoutActionConfirmationPopup: null
    };
  }

  toggleRequestPopup = () => {
    this.setState({ showRequestPopup: !this.state.showRequestPopup });
  };

  toggleFewLeftPopup = () => {
    this.setState({ showFewLeftPopup: !this.state.showFewLeftPopup });
  };

  toggleActionConfirmationPopup = (force_close = false) => {
    this.setState({
      showActionConfirmationPopup:
        !force_close && !this.state.showActionConfirmationPopup
    });
  };

  // loadNotifications = elements => {
  //   let data = [];
  //   for (let i = 0; i < elements.length; i++)
  //     for (let j = 0; j < elements[i].elements.length; j++)
  //       for (let k = 0; k < elements[i].elements[j].elements.length; k++) {
  //         let notifications =
  //           elements[i].elements[j].elements[k]["notifications"];
  //         for (let n = 0; n < notifications.length; n++) {
  //           //data.push(new Notification(notifications[n]));
  //           data.push(notifications[n]);
  //         }
  //       }
  //   return data;
  // };

  loadNotifications = elements => {
    let data = [];
    for (let i = 0; i < elements.length; i++)
      if (elements[i].type === "category") {
        let subelements = this.loadNotifications(elements[i].elements);
        for (let j = 0; j < subelements.length; j++) data.push(subelements[j]);
      } else {
        if (elements[i].notifications.length)
          for (let j = 0; j < elements[i].notifications.length; j++)
            data.push(elements[i].notifications[j]);
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
              onClickOption={this.onClickOption}
              onToggleMobileDrawer={this.onToggleMobileDrawer}
            />
            <Main
              onItemClick={this.onItemClick}
              elements={this.state.elements}
              chosen={this.state.chosen}
            />
          </div>
          <div className="App-right" data-visible={this.state.drawer_visible}>
            <SideBar
              element={this.state.chosen}
              location={location}
              onClickDiscardSearch={this.onClickDiscardSearch}
              onClickSearch={this.onNavBarClick}
              onClickRequest={this.toggleRequestPopup}
              onActionConfirmation={this.toggleActionConfirmationPopup}
              onToggleMobileDrawer={this.onToggleMobileDrawer}
              onClickFew={this.toggleFewLeftPopup}
            />
          </div>
          {this.state.showRequestPopup ? (
            <RequestItemPopup
              togglePopup={this.toggleRequestPopup}
              onSubmit={this.onRequestSubmit}
            />
          ) : null}

          {this.state.showActionConfirmationPopup ? (
            <ActionItemPopupConfirmation
              togglePopup={this.toggleActionConfirmationPopup}
              onReturnToDashboard={() => {
                this.onItemClick(null);
                this.toggleActionConfirmationPopup("close");
              }}
            />
          ) : null}

          {this.state.showFewLeftPopup ? (
            <FewLeftPopup
              togglePopup={this.toggleFewLeftPopup}
              onConfirm={this.onFewLeftSubmit}
            />
          ) : null}
        </div>
      </div>
    );
  }

  onClickOption = ID => {
    console.log(ID);
    this.setState((state, props) => ({
      chosen: (() => {
        return this.onItemClickMaiSmechera(ID, state.elements)["chosen"];
      })()
    }));
  };

  onClickGoBack = ID => {
    //console.log(ID);
    if (ID !== null) {
      if (ID.parentID !== null) {
        //console.log(ID.parentID);
        this.setState((state, props) => ({
          chosen: (() => {
            return this.onItemClickMaiSmechera(ID.parentID, state.elements)[
              "chosen"
            ];
          })()
        }));
      } else {
        this.setState((state, props) => ({
          chosen: (() => {
            return this.onItemClickMaiSmechera(ID.ID, state.elements)["chosen"];
          })()
        }));
      }
    } else {
      this.setState((state, props) => ({
        chosen: (() => {
          return this.onItemClickMaiSmechera(ID, state.elements)["chosen"];
        })()
      }));
    }
  };

  onItemClickMaiSmechera = (ID, V) => {
    let found = null;
    if (V !== null) {
      for (let i = 0; i < V.length; i++) {
        V[i].chosen = false;
        if (String(V[i].ID) === String(ID)) {
          V[i].chosen = V[i].type === Config.ELEMENT_TYPE_ITEM;
          return {
            chosen: V[i],
            elements: V
          };
        } else if (V[i].type !== Config.ELEMENT_TYPE_ITEM)
          found = this.onItemClickMaiSmechera(ID, V[i].elements)["chosen"];
        if (found !== null) break;
      }
    }
    return {
      chosen: found,
      elements: V
    };
  };

  onItemClick = ID => {
    let elements = this.onItemClickMaiSmechera(
      "Use this recursive function to make every chosen flag false",
      this.state.elements
    )["elements"];
    let object = this.onItemClickMaiSmechera(ID, elements);
    let item = object.chosen;
    if (item && item.type === Config.ELEMENT_TYPE_ITEM) {
      this.onToggleMobileDrawer("open");
    }

    this.setState((previousState, props) => {
      return {
        elements: object.elements,
        chosen: (() => {
          return item;
        })()
      };
    });
  };

  onClickDiscardSearch = () => {
    const chosen = null;

    this.setState({ chosen, navBarClick: false });
  };

  discardSearch = () => {
    this.setState({ navBarClick: false });
  };

  onNavBarClick = () => {
    this.setState({
      drawer_visible: false,
      navBarClick: true
    });
  };

  onRequestSubmit = (name, description, employee) => {
    /**
     * gets the input from the fields in the request item form
     */
    console.log(name + description + employee);
    this.toggleRequestPopup();
  };

  onFewLeftSubmit = amount => {
    console.log(amount);
    if (amount === "") alert("No amount inserted!");
    else {
      this.toggleFewLeftPopup();
      this.toggleActionConfirmationPopup();
    }
  };
  onToggleMobileDrawer = (force = null) => {
    this.setState((state, props) => ({
      drawer_visible: force !== null ? force === "open" : !state.drawer_visible
    }));
  };
}

export default App;
