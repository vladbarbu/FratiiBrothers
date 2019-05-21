import React, { Component } from "react";
import StationProfile from "../Station/StationProfile";


import StationCard from "../Station/StationCard";

class ScreenStations extends Component {


    renderStationList(){
        let flag = 0;
        return (
            <div className={"ScreenStations"}>
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
            </div>
        )
    }

    renderStationProfile(){
        return (
            <div className={"ScreenStations"}>
                <div className={"StationProfileContainer"}>
                    <StationProfile
                        chosenStation={this.props.chosenStation}
                        chosenElement={this.props.chosenElement}
                        goBackToStations={this.props.goBackToStations}
                    />
                </div>
            </div>
        )
    }



    render() {
        return (this.props.chosenStation === null ) ? this.renderStationList() : this.renderStationProfile();
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