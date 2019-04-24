import React, { Component } from "react";

class NotificationMessage extends Component {
  state = {
    className: this.props.messageClassName,
    message: this.props.message
  };
  getMessageClassName() {
    if (this.state.className === "important") return "red-message";
    else if (this.state.className === "semiImportant") return "green-message";
    else return "normal-message";
  }
  render() {
    return (
      <div>
        <h6 className={this.getMessageClassName()}>{this.props.message}</h6>
      </div>
    );
  }
}

export default NotificationMessage;
