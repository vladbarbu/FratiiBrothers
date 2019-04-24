import React, { Component } from "react";
import RequestForm from "./RequestForm";

import "../resources/styles/RequestPopup.css";
class RequestItemPopup extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
    console.log(node);
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log("You clicked outside of me!");
      //this.state.inputValue = "";
      this.props.togglePopup();
    }
  }

  render() {
    return (
      <div className="requestPopup">
        <div className="requestPopup_inner" ref={this.setWrapperRef}>
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
