import React, { Component } from "react";
import "../resources/styles/ActionItemPopupConfirmation.scss";
import AppContext from "../model/AppContext";

class ActionItemPopupConfirmation extends Component {

  componentDidMount() {
    this.context.doChangeIsSafeToUpdateUniverse(true);
    setTimeout(()=>{
      this.context.doUpdateUniverse();
      this.props.togglePopup(true);
      this.props.onReturnToDashboard();
    }, 4000);
  }

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
          <div className="button return">
            Returning to dashboard...
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

ActionItemPopupConfirmation.contextType = AppContext;
export default ActionItemPopupConfirmation;
