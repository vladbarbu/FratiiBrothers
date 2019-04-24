import React, { Component } from "react";
import RequestForm from "./RequestForm";
class RequestItemPopup extends Component {
  render() {
    return (
      <div className="requestPopup">
        <div className="requestPopup_inner">
          <h2>Request new item</h2>
          <button onClick={() => this.props.togglePopup()}>
            Return to dashboard
          </button>
          <p>
            Fill in the form with the information about a new product you would
            like to see at this shared station.
          </p>
          <p>
            Management will be notified about your request and it will be taken
            into account.
          </p>
          <RequestForm onSubmit={this.props.onSubmit} />
          <button onClick={() => this.props.togglePopup()}>
            Cancel request
          </button>
        </div>
      </div>
    );
  }
}

export default RequestItemPopup;
