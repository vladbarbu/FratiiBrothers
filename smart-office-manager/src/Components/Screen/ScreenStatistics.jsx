import SupplyStatistics from "../SupplyStatistics";
import SideBarStatistics from "../SideBarStatistics";
import React, { Component } from "react";

class ScreenStatistics extends Component {
    render() {
        return (
            <div className="SupplyStatistics">
                <SupplyStatistics
                    checkForNotifications={this.props.checkForNotifications}
                    stations={this.props.stations}
                    onClickSupplyStation={this.props.onClickSupplyStation}
                    chosenStation={this.props.chosenStation}
                    chosenItem={this.props.chosenItem}
                />

                {this.props.chosenStation === this.props.localStation &&
                this.props.chosenStation ? (
                    <SideBarStatistics
                        chosenStation={this.props.chosenStation}
                        chosenItem={this.props.chosenItem}
                        itemChoose={this.props.itemChoose}
                        updateStations={this.props.updateStations}
                    />
                ) : null}
            </div>
        )
    }
}

export default ScreenStatistics;


