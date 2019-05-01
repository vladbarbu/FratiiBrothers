import React, { Component } from "react";


import "../resources/styles/RequestPopup.scss";
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
      this.props.togglePopup();
    }
  }

  render() {
    return (
      <div className="RequestPopup">
        <div className="inner" >
          <div className="card" ref={this.setWrapperRef}>
            <div className="container">
          <div className="header">
            <h2>Request new item</h2>
            <div className="button return" onClick={() => this.props.togglePopup()}>
              Return to dashboard
            </div>
          </div>

          <p>
            Fill in the form with the information about a new product you would
            like to see at this shared station.
          </p>
          <p>
            Management will be notified about your request and it will be taken
            into account.
          </p>
            <form>
              <div className="field">

                <label htmlFor="request_name">1. Name of the item</label>
                <input id="request_name" type="text" placeholder="e.g. A special kind of sugar"/>
              </div>

              <div className="field">
                <label htmlFor="request_description">2. Description of product and reason for request</label>
                <input id="request_description" type="text" placeholder="Why would you like to make this product available?" />
              </div>

              <div className="field">
                <label htmlFor="request_badge">3. Your name or badge ID</label>
                <input id="request_badge" type="text" placeholder="This will help organise the requests and move faster"/>
              </div>
            </form>
          <div className="footer">
            <div className="button cancel" onClick={() => this.props.togglePopup()}>
              <div className="content">
                <p>Cancel request</p>
              </div>
            </div>
            <div className="button submit" >
              <div className="content">
                <p>Request Product</p>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestItemPopup;
