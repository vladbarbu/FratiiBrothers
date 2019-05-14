import React, { Component } from "react";

class Notifications extends Component {
  state = {
    notifications: [
      "No more papercups on Second Floor!",
      "The number of sodas is running low on First Floor!",
      "More than three complains on the Third floor!",
      "Warning! Complains unsolved for more than 30 minutes!"
    ]
  };

  render() {
    return (
      <div>
        <p>Notifications/Warnings</p>
        <div>
          {this.state.notifications.map(notifications => {
            return <p>{notifications}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default Notifications;
