import React, { Component } from "react";
import StationInfo from "../StationInfo";
import SideBar from "../SideBar";

import Stations from "./../Stations"

class ScreenStations extends Component {



    renderStationList(){
        return (
            <Stations
                checkForNotifications={this.props.checkForNotifications}
                stations={this.props.stations}
                onClickStation={this.props.onClickStation}
            />
        )
    }

    renderStationProfile(){
        return (
            <div className="Station">
                <StationInfo
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
        return (this.props.renderList || this.props.stationInfo === null ) ? this.renderStationList() : this.renderStationProfile();
    }
}

export default ScreenStations;