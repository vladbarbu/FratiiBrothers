import React, { Component } from "react";
import "../../resources/styles/Station.scss";

class StationProfile extends Component {

  constructor(props){
    super(props);
    this.scrollReference = React.createRef();
  }

  state = {
    stations: this.props.stationInfo.elements,
    chosen: null,
    notifications: null,
    numberOfItems: this.searchItems(this.props.stationInfo)
  };



  render() {
    return (
      <div className="StationProfile" ref={this.scrollReference}>
        <div className={"header"}>
          <div className="breadcrumbs"><div onClick={this.props.goBackToStations}>Stations</div>{" "}<i className="material-icons">arrow_right</i>Floor {this.props.stationInfo.floor} &#45; {" Station #"}{this.props.stationInfo.name}<i className="material-icons">arrow_right</i></div>
          <div className={"inner"}>
            <div className={"image"}><img alt="Station profile"  src={this.props.stationInfo.image} /></div>
            <div className={"info"}>
              <div className={"title"}>
                <div className={"icon " + (this.state.notifications === true ? "warn" : "") }><i className="material-icons">ev_station</i></div>
                <p>Station #{this.props.stationInfo.name}</p>
              </div>
              <div className={"description"}><p>{this.props.stationInfo.description}</p></div>

              <div className={"data"}>
                <div className={"itemCount"}><i className="material-icons">label</i>{this.state.numberOfItems} unique items</div>
              </div>

            </div>

            <div className={"actions"}>
              <div className="returnButton" onClick={() => this.props.goBackToStations()}><p>Return to stations</p></div>
              <div className="viewButton" onClick={() => this.props.onClickSupplyStation(this.props.stationInfo)}><p>View statistics for station</p></div>
            </div>



          </div>
        </div>

        <div className="itemTree">
          <span className={"sectionTitle"}><i className="material-icons">list</i> Station Item Stock</span>
          {this.ItemStock(this.state.stations)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props.checkForNotifications(this.props.stationInfo));
    this.setState({notifications: this.props.checkForNotifications(this.props.stationInfo)});


    this.scrollReference.current.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    this.scrollReference.current.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {

    let scroll = this.scrollReference.current.scrollTop;
    console.log(scroll);

  };

  /**
   *
   *
   *
   *
   *
   */

  ItemStock(element) {
    let style = { backgroundColor: "#0DD2A3" };
    return (
      //Only category
      <div className="itemStock">
        {element === this.state.stations
          ? this.state.stations.map((element,index) => {
              return (
                <div key={index} className="categoryItem">
                  <small onClick={() => this.changeActiveChild(element)}>
                    <img
                      src={require("./../../resources/" + element.image)}
                      alt="ok"
                    />
                    <div className="itemText">
                      {element.type === "category" && element.parentID === null
                        ? "Category:"
                        : null}

                      {element.name}
                    </div>
                  </small>
                  {element.childActive === true
                    ? this.ItemStock(element)
                    : null}
                  {/* {this.ItemStock(element)}*/}
                </div>
              );
            })
          : element.elements.map((element,index) => {
              // Items and subcategory
              return (
                <div key={index} className="justItem">
                  <small onClick={() => this.changeActiveChild(element)}>
                    <i className="material-icons subdirectory">
                      subdirectory_arrow_right
                    </i>
                    <img
                      src={require("./../../resources/" + element.image)}
                      alt="ok"
                    />
                    <div className="itemText">
                      {element.type === "item" ? "Item:" : null}
                      {element.type === "category" ? "Subcategory:" : null}

                      {element.name}
                      {element.type === "item" ? ( //Items stock/warnings/notifications
                        <div className="itemNotification">
                          <i className="material-icons">layers</i>
                          {element.quantity} in stock
                          {element.notification !== null ? (
                            element.notifications.length > 0 ? (
                              <b className="warningBadge">New warnings</b>
                            ) : null
                          ) : null}
                        </div>
                      ) : null}
                      {element.type === "item" ? (
                        this.state.chosen === element ? (
                          <i
                            className="material-icons itemButton"
                            style={style}
                          >
                            arrow_forward
                          </i>
                        ) : (
                          <i className="material-icons itemButton">
                            arrow_forward
                          </i>
                        )
                      ) : null}
                    </div>
                  </small>

                  {element.childActive === true
                    ? this.ItemStock(element)
                    : null}
                  {/*{element.type !== "item" ? this.ItemStock(element) : null}*/}
                </div>
              );
            })}
      </div>
    );
  }
  changeActiveChild = active => {
    if (active._childActive === true) active._childActive = false;
    else active._childActive = true;

    if (active.type === "item") {
      this.props.itemChoose(active);
      this.setState({ chosen: active });
    }
    this.setState({ stations: this.state.stations });
  };

  searchItems(element) {
    return this.props.getStationItems(element).length;
  }



}

export default StationProfile;
