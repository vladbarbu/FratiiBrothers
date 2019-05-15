import React, { Component } from "react";
import StationProfile from "../Station/StationProfile";
import SideBar from "../SideBar";

import StationCard from "../Station/StationCard";

class ScreenStations extends Component {


    renderStationList(){
        let flag = 0;
        return (
            <div className="StationList">
                <div className="breadcrumbs"> <p>Stations</p> <i className="material-icons">arrow_right</i> </div>
                {this.props.stations.map(element => {
                    if (flag !== element.floor) {
                        flag = element.floor;
                        return (
                            <div className="stationFloor" key={"floor-" + element.floor}>
                                <div className={"stationFloorInfo"}>
                                    <span className="floorID">Floor {element.floor}</span>
                                    <span className="numberOfStations">{" "}&#8226; {this.numberOfStations(flag)} stations</span>
                                </div>
                                <div className="stationFloorList">
                                    {this.props.stations.map((element, index) => {
                                        if (element.floor === flag) {
                                            return (
                                                <StationCard
                                                    key={index}
                                                    checkForNotifications={this.props.checkForNotifications}
                                                    station={element}
                                                    onClickStation={this.props.onClickStation}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                            </div>
                        );
                    }
                    return null;
                })}
            </div>

        )
    }

    renderStationProfile(){
        return (
            <div className={"StationProfileContainer"}>
                <StationProfile
                    checkForNotifications={this.props.checkForNotifications}
                    stationInfo={this.props.stationInfo}
                    goBackToStations={this.props.goBackToStations}
                    onClickSupplyStation={this.props.onClickSupplyStation}
                    elements={this.props.elements}
                    itemChoose={this.props.itemChoose}
                    getStationItems={this.props.getStationItems}
                />
                {this.props.chosenItem !== null ? (
                    <SideBar
                        chosenItem={this.props.chosenItem}
                        chosenStation={this.props.stationInfo}
                        items={this.props.items}
                        itemStocks={this.props.itemStocks}
                        checkItemStatistics={this.props.checkItemStatistics}
                        clearItemWarnings={this.props.clearItemWarnings}
                        refillStock={this.props.refillStock}
                        toggleConfirmationPopup={this.props.toggleConfirmationPopup}
                        toggleInputPopup={this.props.toggleInputPopup}
                    />
                ) : null}
            </div>
        )
    }



    render() {
        return (this.props.stationInfo === null ) ? this.renderStationList() : this.renderStationProfile();
    }


    /**
     *
     *
     * Helper functions
     *
     * ----------
     * @param flag
     * @returns {number}
     */

    numberOfStations(flag) {
        let count = 0;
        this.props.stations.forEach(element => {
            if (element.floor === flag) count += 1;
        });
        return count;
    }



}

export default ScreenStations;