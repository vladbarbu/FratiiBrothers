/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";
import Config from "../config";
import AppContext from "../Model/AppContext";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.sideBarReference = React.createRef();
    }


    render() {

        /**
         *
          * @type {Element}
         */
        let element = this.props.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS
                ? this.props.chosenElement :
                (this.props.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK ? this.props.chosenStockElement : null );
        /**
         *
         * @type {Station}
         */
        let station = this.props.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS ? this.props.chosenStation :
            (this.props.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK ? this.props.chosenStockStation : null );


        if(Config.isEmpty(element) || Config.isEmpty(station))
            return (
                <div className={"SideBar placeholder"}>
                    <div className={"inner"}>
                        <div className={"image"}/>
                        <div className={"breadcrumbs"}/>
                        <div className={"data"}/>
                        <div className={"data"}/>
                        <div className={"data"}/>
                        <div className={"data"}/>
                        <div className={"data"}/>
                        <div className={"data"}/>
                    </div>
                </div>
            );


        let breadcrumbs = [];
        let current = element;
        let safety = 30;
        while(true){
            if(--safety < 0) break;
            breadcrumbs.push(current.name);
            if(Config.isEmpty(current.parentID) || !station.elementsFlat.hasOwnProperty(current.parentID)) break;
            if(station.elementsFlat.hasOwnProperty(current.parentID)) current = station.elementsFlat[current.parentID];
        }



        let description = [
            {
                icon : "ev_station",
                name : "context",
                label : "Context:",
                value : "Station #" + station.name
            },
            {
                icon : "layers",
                name : "stock_local",
                label : "Stock for the station:",
                value : element.quantity
            },
            {
                icon : "calendar_today",
                name : "expiry",
                label : "Closest expiration:",
                value : "Thursday, May 2nd 2019"
            },
            {
                icon : "business",
                name : "stock_building",
                label : "Stock in the building:",
                value : this.props.stockHolder.elementsFlat[element.ID].quantity
            },
            {
                icon : "warning",
                name : "warn",
                label : "Station item warnings:",
                value : (()=>{
                    try {
                        let notifications = element.notifications;
                        for (let i = 0; i < notifications.length; i++) {
                            if (notifications[i]["type"] === "from_platform") {
                                return notifications[i]["content"].substr(0,notifications[i]["content"].indexOf(' '));
                            }
                        }
                    }catch (e) {
                        console.error(e);
                    }
                    return 0;
                })()
            }
        ];

        let classes = "SideBar";
        classes += (!Config.isEmpty(element)  ? " active" : "");

        return (


          <div className={classes} ref = {this.sideBarReference}  >
              <div className={"inner"}>
                  <div className={"preHeader"}>
                      <div onClick={() => {this.context.doToggleSideBar("close");}} className="button menu"><i className="material-icons">close</i></div>
                  </div>
                  <div className={"header"}>
                      <div className={"image"}>
                          <img alt={"Item element"} src={require("./../resources/" + element.image)}/>
                      </div>
                      <div className={"breadcrumbs"}>
                          {breadcrumbs.slice(0).reverse().map((element, index) => {
                              return <div key={index}><p>{element}</p> { index !== (breadcrumbs.length - 1) ?   <i className={"material-icons"}>arrow_right</i> : null}</div>
                          })}
                      </div>
                  </div>
                  <div className={"main"}>
                      <div className={"sectionTitle"}><i className="material-icons">description</i> Description</div>
                      <div className={"box quantity"}><p>{element.quantity}</p><span>{ this.props.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK ? "in station stock" : "in station stock"  }</span></div>
                      {description.map((element,index)=>{
                          return <div key={index} className={"data " + element.name }>
                              <i className={"material-icons"}>{element.icon}</i>
                              <span>{element.label}</span>
                              <p>{element.value}</p>
                          </div>
                      })}

                      <div className={"data notifications"}>
                          <i className={"material-icons"}>notifications_none</i>
                          <span>Notifications/Warnings:</span>
                          <div className={"button"}><span>See all</span></div>
                      </div>

                      <div className={"actions"}>
                          <div className={"button refill"}><div className={"content"}><p>Refill Stock</p><span>and clear warnings</span></div></div>
                          <div className={"button edit"}><div className={"content"}><p>Edit Stock</p></div></div>
                          <div className={"button clear"}><div className={"content"}><p>Clear Warnings</p></div></div>
                          <div onClick={()=>{this.context.doShowScreenSupplyStation(station,element)}} className={"button statistics"}><div className={"content"}><p>View item statistics</p></div></div>
                      </div>

                  </div>
              </div>
          </div>
        );
      }
}

SideBar.contextType = AppContext;
export default SideBar;
