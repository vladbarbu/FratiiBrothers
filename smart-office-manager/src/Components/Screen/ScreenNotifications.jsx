import React, { Component } from "react";
import './../../resources/styles/Notification.scss'


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
            {this.props.notifications.map(
                (notification,index)=> {
                  console.log(notification);
                  return <div key={index} className="notification-item">
                    <div className="header">
                      <div className={"title"}>
                        <p>Item: <span>{this.getItemNameById(notification.itemID)}</span></p>
                        <p>Station: <span>{this.getStationNameById(notification.stationID)}</span></p>
                        <p>Date: <span>{notification.createdAtParsed}</span></p>
                      </div>

                      <div className="action">
                        <div className={"button"}><i className={"material-icons"}>clear</i><div className={"content"}><p>Clear</p></div></div>
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
        </div>
      </div>
    );
  }
}

export default ScreenNotifications;
