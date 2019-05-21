import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './../../resources/styles/Notification.scss'
import AppContext from "../../Model/AppContext";
import Config from "../../config";


class ScreenNotifications extends Component {
  
  getItemNameById = ID => {
    let items = this.props.items;
    for (let i = 0; i < items.length; i++)
      if (items[i].ID === ID) return items[i].name;
    return null;
  };

  getStationNameById = ID => {
    let stations = this.props.stations;
    for(let i = 0; i < stations.length; i++)
      if(stations[i]._ID === ID) return stations[i].name;
    return null;
  };



  render() {
    return (
      <div className = {"ScreenNotifications"}>
        <div className = {"sectionTitle"}>
          <i className={"material-icons"}>notifications_none</i><p> Notifications</p>
        </div>
          <div className={"notificationsList"}>
        <ReactCSSTransitionGroup
            transitionName="notification-item-animation"
            transitionLeaveTimeout={300}>

            {this.props.notifications.map(
                (notification)=> {
                  return <div key={notification.ID} className="notification-item">
                    <div className="header">
                      <div className={"title"}>
                        <p>{notification.ID} Item: <span>{this.getItemNameById(notification.itemID)}</span></p>
                        <p>Station: <span>{this.getStationNameById(notification.stationID)}</span></p>
                        <p>Date: <span>{notification.createdAtParsed}</span></p>
                      </div>

                      <div className="action">
                        <div onClick={()=>{ this.doNotificationDismiss(notification);  }}  className={"button"}><i className={"material-icons"}>clear</i><div className={"content"}><p>Clear</p></div></div>
                      </div>
                    </div>
                    <div className="notification-item-message">
                      <p>
                        {notification.type === "from_management"
                            ? "From management: "
                            : "From platform: "}
                        {notification.content}
                      </p>
                    </div>
                  </div>
                })
            }
        </ReactCSSTransitionGroup>
          </div>

      </div>
    );
  }



  /**
   *
   * @param {SNotification} notification
   */
  doNotificationDismiss = (notification) =>{

    let localScope = this;
    try {
      localScope.context.doNetworkingClearWarning(notification.stationID, notification.itemID, notification.ID)
          .then((globalScope) => {
            localScope.context.showAlert("The notification has been dismissed.");
            let notifications = [...globalScope.state.notifications];
            for(let i = 0; i < notifications.length; i++) if(notifications[i].ID === notification.ID) {notifications.splice(i,1); break;}
            globalScope.setState({notifications:notifications});
          })
          .catch(() => {
            localScope.context.showAlert("Error on dismissing notification", Config.ALERT_TYPE_ERROR);
          })


    }catch (error) {
      console.error(error);
      localScope.context.showAlert("Error on dismissing notification", Config.ALERT_TYPE_ERROR);
    }
  }
}

ScreenNotifications.contextType = AppContext;
export default ScreenNotifications;
