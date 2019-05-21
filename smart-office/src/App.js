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
import AllNotificationsPopup from "./Components/AllNotificationsPopup";
import AppContext from './model/AppContext'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      initial : null,
      station : {},
      drawer_visible: false,
      elements: [],
      items: [],
      itemsFlat : {},
      notifications: [],
      chosen: null,
      navBarClick: false,
      showRequestPopup: false,
      showFewLeftPopup: false,
      showActionConfirmationPopup: false,
      timeoutActionConfirmationPopup: null,
      showNotificationsPopup: false,
      loading : false,
      isSafeToUpdateUniverse : true,
    };
  }

  componentDidMount() {

    this.setState({loading : true});
    this.doUpdateUniverse().then(()=> {
       this.setState({loading : false});
    });


    setInterval(() => {this.doUpdateUniverse()}, 30000);



  }





  /**
   * ------
   */

  toggleRequestPopup = () => {
    this.setState({ showRequestPopup: !this.state.showRequestPopup });
  };

  toggleFewLeftPopup = () => {
    this.setState({ showFewLeftPopup: !this.state.showFewLeftPopup });
  };

  toggleActionConfirmationPopup = (force = null) => {
    this.setState({
      showActionConfirmationPopup: (force !== null ? (force === 'open') : (!this.state.showActionConfirmationPopup))
    });
  };

  toggleNotificationsPopup = () => {
    this.setState({
      showNotificationsPopup: !this.state.showNotificationsPopup
    });
  };











  render() {

    return (
        <AppContext.Provider value={Config.generateAppContextValues(this)} >
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
                    onToggleNotificationPopup={this.toggleNotificationsPopup}
                  />
                  <Main
                    onItemClick={this.onItemClick}
                    elements={this.state.elements}
                    chosen={this.state.chosen}
                  />
                </div>
                <div className="App-right" data-visible={this.state.drawer_visible}>
                  <SideBar
                    itemsFlat = {this.state.itemsFlat}
                    element={this.state.chosen}
                    items={this.state.items}
                    notifications={this.state.notifications}
                    onClickDiscardSearch={this.onClickDiscardSearch}
                    onClickSearch={this.onNavBarClick}
                    onClickRequest={this.toggleRequestPopup}
                    onActionConfirmation={this.toggleActionConfirmationPopup}
                    onToggleMobileDrawer={this.onToggleMobileDrawer}
                    onClickFew={this.toggleFewLeftPopup}
                    onClickNotifications={this.toggleNotificationsPopup}
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

                {this.state.showNotificationsPopup ? (
                  <AllNotificationsPopup
                    togglePopup={this.toggleNotificationsPopup}
                    notifications={this.state.notifications}
                    items={this.state.items}
                    itemsFlat={this.state.itemsFlat}
                  />
                ) : null}

                <div className={"AppLoader " + (this.state.loading ? "active" : "") }><div><p>Loading...</p></div></div>
              </div>
            </div>
        </AppContext.Provider>
    );
  }

  onClickOption = ID => {
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
    this.toggleActionConfirmationPopup();
  };

  onFewLeftSubmit = amount => {
    if (amount === "") alert("No amount inserted!");
    else {
      this.doNotificationSend({itemId : this.state.chosen.ID, quantity: amount});
      this.toggleFewLeftPopup();
      this.toggleActionConfirmationPopup();
    }
  };
  onToggleMobileDrawer = (force = null) => {
    this.setState((state, props) => ({
      drawer_visible: force !== null ? force === "open" : !state.drawer_visible
    }));
  };



  doUpdateUniverse  = () => {

    console.log(this);
    let self = this;

    console.log("Updating universe...");
    if(!self.state.isSafeToUpdateUniverse){
      console.log("Universe not safe to update.");
      return new Promise((resolve)=>{resolve();});
    }

    return new Promise( (resolve, reject) => {

      let request = Config.loadElementsFromAPI();

      request
          .then((data) => {

            if(self.state.initial !== undefined && self.state.initial !== null){
              if(JSON.stringify(self.state.initial) ===  JSON.stringify(data)){
                console.log("Universe was already up to date.");
                resolve();
                return;
              }
            }


            let elements = (()=>{
              try {
                let elements = data["elements"];
                if (elements) {
                  let data = [];
                  for (let i = 0; i < elements.length; i++) {
                    data.push(new Element(elements[i]));
                  }
                  return data;
                }
              } catch (e) {
                console.error(e);
                return [];
              }
            })();
            let items = Config.loadItems(elements);
            let notifications = Config.loadNotifications(items);

            let station = {
              id : !Config.isEmpty(data["id"]) ? data["id"] : null,
              name : !Config.isEmpty(data["name"]) ? data["name"] : null,
              description : !Config.isEmpty(data["description"]) ? data["description"] : null,
              image : !Config.isEmpty(data["image"]) ? data["image"] : null,
              floor : !Config.isEmpty(data["floor"]) ? data["floor"] : null,
            };

            self.setState({
              initial : data,
              itemsFlat : Config.flattenElements(items),
              station : station,
              drawer_visible: false,
              elements: elements,
              items: items,
              notifications: notifications,
              chosen: null,
              navBarClick: false,
              showRequestPopup: false,
              showFewLeftPopup: false,
              showActionConfirmationPopup: false,
              timeoutActionConfirmationPopup: null,
              showNotificationsPopup: false,
              loading : false,
            });
            resolve();
          })
          .catch( () => {
            reject();
          })
    });
  };

  doNotificationSend = (data) => {

    let self = this;


    self.setState({
      loading : true,
      isSafeToUpdateUniverse : false
    });





    return new Promise((resolve, reject) => {
      axios.post(Config.API_NOTIFICATION_SEND,{
        stationId: self.state.station.id,
        itemId : data.itemId,
        quantity : Config.isEmpty(data.quantity) ? 0 : data.quantity,
      })
          .then((response) => {
            try {
              console.log(response);
              let status = response["status"];
              if (parseInt(status) === Config.HTTP_REQUEST_STATUS_OK || parseInt(status) === Config.HTTP_REQUEST_STATUS_CREATED ){
                console.log("[OK] Notification was successful!");
              }
              else console.log("Notification encountered errors.")
            }catch (e) {
              console.error("Notification failed.");
              console.error(e);
              reject();
            }
          })
          .catch((error) => {
            console.error("Notification failed miserably.");
            console.error(error);
            reject();
          })
          .finally(() => {
            self.setState({
              loading: false,
            });
          });
    })
  }


}

export default App;
