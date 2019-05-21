import React, { Component } from "react";

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
  }
  render() {
    return (
      <div className = {"ScreenNotifications"}>
        <div className = {"header"}>
          <h4>Notifications</h4>
        </div>
        {this.props.notifications.map((notification, index) => (
          <div key={index} className={"notification-item"}>
            <div className={"header"}>
              <p>Item name: {this.getItemNameById(notification.itemID)}</p>
              <p>Station name: {this.getStationNameById(notification.stationID)}</p>
            </div>
            <div className={"notification-item-message"}>
              <h6>{notification.content}</h6>
            </div>
          </div>
        )) }
      </div>
    );
  }
}

export default ScreenNotifications;
