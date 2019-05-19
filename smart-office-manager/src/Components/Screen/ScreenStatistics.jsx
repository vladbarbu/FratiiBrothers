// import SideBarStatistics from "../SideBarStatistics";
import React, { Component } from "react";
import Config from "../../config";
import StationIndicator from "../Station/StationIndicator";
import "../../resources/styles/Statistics.scss";
import SupplyTab from "../Statistics/SupplyTab";
import SideBarStatistics from "../Statistics/SideBarStatistics";

class ScreenStatistics extends Component {
    render() {
        return (
            <div className={"ScreenStatistics"}>

                <div className={"header"}>
                    <span className={"sectionTitle"}><i className="material-icons">list</i> Stations</span>
                    <div className={"stationList"}>
                        {this.props.stations.map((element,index) => {
                            return <StationIndicator
                                active={
                                    !Config.isEmpty(this.props.chosenStatisticsStation) ?
                                        (String(element.ID) === String(this.props.chosenStatisticsStation.ID)) : (index === 0)
                                }
                                key={index}
                                station={element} />
                        })}
                    </div>
                </div>
                <div className={"content"}>
                    <span className={"sectionTitle"}><i className="material-icons">show_chart</i> Supply Statistics</span>
                    <div className={"tabs"}>
                        <div className={"header"}>
                        <SupplyTab active={true} element={{icon:"calendar_today", title : "Supply Calendar"}} />
                        <SupplyTab element={{icon:"graphic_eq", title : "Supply Graph"}} />
                        </div>
                        <div className={"content"}>

                        </div>
                    </div>

                </div>


                <SideBarStatistics chosenStatisticsStation={this.props.chosenStatisticsStation} />
            </div>
        )
    }
}

export default ScreenStatistics;


