import React, { Component } from "react";
import Config from "./../config"
import AppContext from "./../model/AppContext"


import "../resources/styles/RequestPopup.scss";
import axios from "axios";
class RequestItemPopup extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);

    this.request_name = React.createRef();
    this.request_description = React.createRef();
    this.request_badge = React.createRef();

    this.request_modal = React.createRef();



    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
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

  doRequest(){
    let self = this;


    let name = this.request_name.current.value;
    let description = this.request_description.current.value;
    let badge = this.request_badge.current.value;

    let flag = false;

    if(Config.isEmpty(name)){ if(!this.request_name.current.classList.contains("warn"))  this.request_name.current.classList.add("warn");flag = true;}
    else if(this.request_name.current.classList.contains("warn")) this.request_name.current.classList.remove("warn");


    if(Config.isEmpty(description)){if(!this.request_description.current.classList.contains("warn")) this.request_description.current.classList.add("warn");flag = true;}
    else if(this.request_description.current.classList.contains("warn")) this.request_description.current.classList.remove("warn");

    badge = Config.isEmpty(badge) ? "-" : badge;

    if(flag === true) return;


    this.context.startLoading();
    if(!this.request_modal.current.classList.contains("loading")) this.request_modal.current.classList.add("loading");





    return new Promise((resolve, reject) => {
      axios.post(Config.API_REQUEST_SEND,{
        stationId: self.context.station.id,
        name : name,
        description : description,
        badge : badge
      })
          .then((response) => {
            try {
              console.log(response);
              let status = response["status"];
              if (parseInt(status) === Config.HTTP_REQUEST_STATUS_OK || parseInt(status) === Config.HTTP_REQUEST_STATUS_CREATED ){
                  console.log("[OK] Product request was successful!");
                  self.context.stopLoading();
                  if(this.request_modal.current.classList.contains("loading")) this.request_modal.current.classList.remove( "loading");
                  this.props.onSubmit();
              }
              else console.log("Product request encountered errors.")
            }catch (e) {
              console.error("Product request failed.");
              console.error(e);
              reject();
            }
          })
          .catch((error) => {
            console.error("Product request failed miserably.");
            console.error(error.response);
            self.context.stopLoading();
            if(this.request_modal.current.classList.contains("loading")) this.request_modal.current.classList.remove( "loading");
            reject();
           })
    })
  }

  render() {
    return (
      <div className="RequestPopup" ref={this.request_modal}>
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

                <label htmlFor="request_name">1. Name of the item *</label>
                <input id="request_name"  ref={this.request_name} type="text" placeholder="e.g. A special kind of sugar"/>
              </div>

              <div className="field">
                <label htmlFor="request_description">2. Description of product and reason for request *</label>
                <input id="request_description" ref={this.request_description} type="text" placeholder="Why would you like to make this product available?" />
              </div>

              <div className="field">
                <label htmlFor="request_badge">3. Your name or badge ID</label>
                <input id="request_badge" ref={this.request_badge} type="text" placeholder="This will help organise the requests and move faster"/>
              </div>
            </form>
          <div className="footer">
            <div className="button cancel" onClick={() => this.props.togglePopup()}>
              <div className="content">
                <p>Cancel request</p>
              </div>
            </div>
            <div className="button submit" onClick={() => {this.doRequest();}} >
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
RequestItemPopup.contextType = AppContext;
export default RequestItemPopup;
