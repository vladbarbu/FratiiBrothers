import React, { Component } from "react";
import "../../resources/styles/Station.scss";
import Tree from "./../Tree/Tree";
import AppContext from "../../Model/AppContext";

class StationProfile extends Component {

  constructor(props){
    super(props);
    this.scrollReference = React.createRef();
  }


  render() {
    return (
      <div className="StationProfile" ref={this.scrollReference}>
        <div className={"header"}>
          <div className="breadcrumbs">
            <p onClick={this.props.goBackToStations}>Stations</p>
            {" "}
            <div>
              <i className="material-icons">arrow_right</i>
              <p>Floor {this.props.chosenStation.floor} &#45; {" Station #"}{this.props.chosenStation.name}</p>
            </div>
          </div>
          <div className={"inner"}>
            <div className={"image"}><img alt="Station profile"  src={this.props.chosenStation.image} /></div>
            <div className={"info"}>
              <div className={"title"}>
                <div className={"icon " + (this.props.notifications === true ? "warn" : "") }><i className="material-icons">ev_station</i></div>
                <p>Station #{this.props.chosenStation.name}</p>
              </div>
              <div className={"description"}><p>{this.props.chosenStation.description}</p></div>

              <div className={"data"}>
                <div className={"itemCount"}><i className="material-icons">label</i>{this.props.chosenStation.uniqueItems} unique items</div>

                <div className={"actions"}>
                  <div className="returnButton" onClick={() => this.props.goBackToStations()}><div className={"content"}><p>Return to stations</p></div></div>
                  <div className="viewButton" onClick={() => this.context.doShowScreenSupplyStation(this.props.chosenStation, null)}><div className={"content"}><p>View statistics for station</p></div></div>
                </div>
              </div>

            </div>




          </div>
        </div>

        <div className="itemTree">
          <span className={"sectionTitle"}><i className="material-icons">list</i> Station Item Stock</span>
          <Tree elements={this.props.chosenStation.elements}  />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.scrollReference.current.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    this.scrollReference.current.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {

    //let scroll = this.scrollReference.current.scrollTop;


  };



}

StationProfile.contextType = AppContext;
export default StationProfile;
