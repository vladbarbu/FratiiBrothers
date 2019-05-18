import React, { Component } from "react";
import "../../resources/styles/Station.scss";
import Tree from "./../Tree/Tree";

class StationProfile extends Component {

  constructor(props){
    super(props);
    this.scrollReference = React.createRef();
  }

  state = {
    stations: this.props.chosenStation.elements,
    chosenElement: null,
    notifications: null,
    numberOfItems: this.props.getStationItems(this.props.chosenStation).length
  };



  render() {
    console.log(this.props.chosenStation);
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
                <div className={"icon " + (this.state.notifications === true ? "warn" : "") }><i className="material-icons">ev_station</i></div>
                <p>Station #{this.props.chosenStation.name}</p>
              </div>
              <div className={"description"}><p>{this.props.chosenStation.description}</p></div>

              <div className={"data"}>
                <div className={"itemCount"}><i className="material-icons">label</i>{this.state.numberOfItems} unique items</div>

                <div className={"actions"}>
                  <div className="returnButton" onClick={() => this.props.goBackToStations()}><div className={"content"}><p>Return to stations</p></div></div>
                  <div className="viewButton" onClick={() => this.props.onClickSupplyStation(this.props.chosenStation)}><div className={"content"}><p>View statistics for station</p></div></div>
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
    this.setState({notifications: this.props.checkForNotifications(this.props.chosenStation)});
    this.scrollReference.current.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    this.scrollReference.current.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {

    //let scroll = this.scrollReference.current.scrollTop;


  };



}

export default StationProfile;
