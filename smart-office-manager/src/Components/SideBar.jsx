/**
 * Created by @VanSoftware on 2019-05-05.
 */
import React, { Component } from "react";
import "../resources/styles/SideBar.scss";
import Config from "../config";
import AppContext from "../Model/AppContext";
import Moment from 'moment';

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
                value : (()=>{
                    if(Config.isEmpty(element.stock) || element.stock.length === 0) return "-";
                    let date = Moment(element.stock[0].expirationDate,Moment.ISO_8601);
                    for(let i = 1; i < element.stock.length; i++){
                        if(date.isAfter(Moment(element.stock[i].expirationDate,Moment.ISO_8601)))
                            date =  Moment(element.stock[i].expirationDate,Moment.ISO_8601);
                    }
                    return date.format("MMMM Do YYYY");
                })()
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
                      <div onClick={() => {this.context.doToggleSideBar("close");}} className="button menu"><p>Close</p><i className="material-icons">close</i></div>
                  </div>
                  <div className={"header"}>
                      <div className={"image"}>
                          <img alt={"Item element"} src={element.image}/>
                      </div>
                      <div className={"breadcrumbs"}>
                          {breadcrumbs.slice(0).reverse().map((element, index) => {
                              return <div key={index}><p>{element}</p> { index !== (breadcrumbs.length - 1) ?   <i className={"material-icons"}>arrow_right</i> : null}</div>
                          })}
                      </div>
                  </div>
                  <div className={"wrapper"}>
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
                          <div className={"button"} onClick={()=>{this.showNotifications(element, station)}}><span>See all</span></div>
                      </div>

                      <div className={"actions"}>
                          <div onClick={()=>{this.context.doActionElementRefillStock(station,element)}} className={"button refill"} ><div className={"content"}><p>Refill Stock</p><span>and clear warnings</span></div></div>
                          <div onClick={()=>{this.context.doActionElementEditStock(station,element)}} className={"button edit"}><div className={"content"}><p>Edit Stock</p></div></div>
                          <div onClick={()=>{this.context.doActionElementClearWarnings(station,element)}} className={"button clear"}><div className={"content"}><p>Clear Warnings</p></div></div>
                          <div onClick={()=>{this.context.doShowScreenSupplyStation(station,element)}} className={"button statistics"}><div className={"content"}><p>View item statistics</p></div></div>
                      </div>

                  </div>
                  </div>
              </div>
          </div>
        );
      }

      async showNotifications(element, station){

          let modalID = "MODAL-actionElementShowNotifications";


          let modal = Config.createModalObject({
              ID : modalID,
              title : "Notifications/Warnings",
              description : !Config.isEmpty(element.notifications) && element.notifications.length > 0? "Notifications/Warnings for " + element.name +" from station #" + station.name : "There are 0 notifications/warnings for this item at the moment.",
              customContent : function(){
                  return (
                      <div className={"customContent"}>
                          {element.notifications.map( (notification,key) => {
                              return (
                                  <div key={key} className="notification-item">
                                      <div className="header">
                                          <p>{element.name}</p>
                                          <p className="time">
                                              { Moment(notification["createdAt"],Moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}
                                          </p>
                                      </div>
                                      <div className="notification-item-message">
                                          <h6>
                                              {notification.type === "from_management" ? "From management: " : null}{" "}
                                              {notification.content}
                                          </h6>
                                      </div>
                                  </div>
                              )
                          })}
                      </div>)

              },
              buttons : [
                  {
                      ID: "close",
                      title: "Cancel",
                      callback_click: function(){this.hide();},
                  }
              ]
          });

          await this.context.registerGlobalModal(modal);

          this.context.showGlobalModal(modal.ID);

      }
}

SideBar.contextType = AppContext;
export default SideBar;
