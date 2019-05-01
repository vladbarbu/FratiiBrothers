import React, { Component } from "react";
import "../resources/styles/ActionItemPopupConfirmation.scss";

class ActionItemPopupConfirmation extends Component {


  render() {
    return (
      <div className="ActionItemPopupConfirmation">
        <div className="inner" >
          <div className="card">
            <div className="container">
          <div className="header">
            <i className="material-icons">check</i>
            <h2>Thank you for your input</h2>
          </div>
          <p>
            Management has been notified about this. The issue will be fixed as soon as possible. Thank you!
          </p>
          <div className="button return" onClick={() => this.props.togglePopup(true)}>
            Return to dashboard
          </div>

          <div className="footer">
            <div className="loader"><div className="inner"/></div>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActionItemPopupConfirmation;
