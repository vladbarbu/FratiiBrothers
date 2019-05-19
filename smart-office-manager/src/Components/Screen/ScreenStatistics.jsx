import React, { Component } from "react";
import Config from "../../config";
import StationIndicator from "../Station/StationIndicator";
import "../../resources/styles/Statistics.scss";
import SupplyTab from "../Statistics/SupplyTab";
import SideBarStatistics from "../Statistics/SideBarStatistics";
import AppContext from "../../Model/AppContext";
import SupplyTabContentCalendar from "../Statistics/SupplyTabContentCalendar";

class ScreenStatistics extends Component {

    state = {
        activeTabIndex : 0
    };



   componentDidMount() {
       if(this.props.chosenStatisticsStation === null) {
           this.context.doShowScreenSupplyStation(this.props.stations[0], null);
           return null;
       }
   }

    render() {


        return (
            <div className={"ScreenStatistics"}>

                <div className={"main"}>
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
                            <SupplyTab index={0} doChooseTab={this.doChooseTab} activeTabIndex={ this.state.activeTabIndex} element={{icon:"calendar_today", title : "Supply Calendar"}} />
                            <SupplyTab index={1} doChooseTab={this.doChooseTab} activeTabIndex={ this.state.activeTabIndex} element={{icon:"graphic_eq", title : "Supply Graph"}} />
                            </div>
                            <div className={"content"}>
                                { this.state.activeTabIndex === 0 ?    <SupplyTabContentCalendar element={this.props.chosenStatisticsElement} /> : null }

                            </div>
                        </div>

                    </div>
                </div>


                <SideBarStatistics isSideBarStatisticsExpanded={this.props.isSideBarStatisticsExpanded}  chosenStatisticsStation={this.props.chosenStatisticsStation} />
            </div>
        )
    }

    doChooseTab = (index) => {

        this.setState({
            activeTabIndex : index,
        });
    }

}

ScreenStatistics.contextType = AppContext;
export default ScreenStatistics;


