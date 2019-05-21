import React, { Component } from "react";
import Config from "../../config";
import StationIndicator from "../Station/StationIndicator";
import "../../resources/styles/Statistics.scss";
import SupplyTab from "../Statistics/SupplyTab";
import SideBarStatistics from "../Statistics/SideBarStatistics";
import AppContext from "../../Model/AppContext";
import SupplyTabContentCalendar from "../Statistics/SupplyTabContentCalendar";
import SupplyTabContentGraph from "../Statistics/SupplyTabContentGraph";

class ScreenStatistics extends Component {

    state = {
        activeTabIndex : 0
    };


    statistic = {
        byDay : {
            day : "21/05/2019",
            data : [
                {hour : 1, stock : 100, prediction : 200},
                {hour : 2, stock : 70, prediction : 300},
                {hour : 3, stock : 102, prediction : 300},
                {hour : 4, stock : 105, prediction : 300},
                {hour : 5, stock : 200, prediction : 300},
                {hour : 6, stock : 200, prediction : 300},
                {hour : 7, stock : 200, prediction : 300},
                {hour : 8, stock : 200, prediction : 300},
                {hour : 9, stock : 200, prediction : 300},
                {hour : 10, stock : 200, prediction : 220},
                {hour : 11, stock : 200, prediction : 220},
                {hour : 12, stock : 200, prediction : 220},
                {hour : 13, stock : 100, prediction : 220},
                {hour : 14, stock : 70, prediction : 210},
                {hour : 15, stock : 100, prediction : 210},
                {hour : 16, stock : 70, prediction : 210},
                {hour : 17, stock : 100, prediction : 210},
                {hour : 18, stock : 70, prediction : 210},
                {hour : 19, stock : 100, prediction : 200},
                {hour : 20, stock : 70, prediction : 200},
                {hour : 21, stock : 100, prediction : 200},
                {hour : 22, stock : 70, prediction : 200},
                {hour : 23, stock : 100, prediction : 200},
                {hour : 24, stock : 70, prediction : 200},
            ]
        },
        byWeek : {
            weekStart : "19/05/2019",
            data : [
                {date : "19/05/2019", stock : 100, prediction : 200},
                {date : "20/05/2019", stock : 70, prediction : 300},
                {date : "21/05/2019", stock : 102, prediction : 300},
                {date : "22/05/2019", stock : 105, prediction : 300},
                {date : "23/05/2019", stock : 200, prediction : 300},
                {date : "24/05/2019", stock : 200, prediction : 300},
                {date : "25/05/2019", stock : 200, prediction : 300}
            ]
        },
        byMonth : {
            monthStart : "01/05/2019",
            data : [
                {date : "01/05/2019", stock : 100, prediction : 200},
                {date : "02/05/2019", stock : 70, prediction : 300},
                {date : "03/05/2019", stock : 102, prediction : 300},
                {date : "04/05/2019", stock : 105, prediction : 300},
                {date : "05/05/2019", stock : 200, prediction : 300},
                {date : "06/05/2019", stock : 200, prediction : 300},
                {date : "07/05/2019", stock : 200, prediction : 300},
                {date : "08/05/2019", stock : 200, prediction : 300},
                {date : "09/05/2019", stock : 200, prediction : 300},
                {date : "10/05/2019", stock : 200, prediction : 220},
                {date : "11/05/2019", stock : 200, prediction : 220},
                {date : "12/05/2019", stock : 200, prediction : 220},
                {date : "13/05/2019", stock : 100, prediction : 220},
                {date : "14/05/2019", stock : 70, prediction : 210},
                {date : "15/05/2019", stock : 100, prediction : 210},
                {date : "16/05/2019", stock : 70, prediction : 210},
                {date : "17/05/2019", stock : 100, prediction : 210},
                {date : "18/05/2019", stock : 70, prediction : 210},
                {date : "19/05/2019", stock : 100, prediction : 200},
                {date : "20/05/2019", stock : 70, prediction : 200},
                {date : "21/05/2019", stock : 100, prediction : 200},
                {date : "22/05/2019", stock : 70, prediction : 200},
                {date : "23/05/2019", stock : 100, prediction : 200},
                {date : "24/05/2019", stock : 70, prediction : 200},
                {date : "25/05/2019", stock : 100, prediction : 210},
                {date : "26/05/2019", stock : 70, prediction : 210},
                {date : "27/05/2019", stock : 100, prediction : 200},
                {date : "28/05/2019", stock : 70, prediction : 200},
                {date : "29/05/2019", stock : 100, prediction : 200},
                {date : "30/05/2019", stock : 70, prediction : 200},
            ]
        }
    };

   componentDidMount() {
       if(this.props.chosenStatisticsStation === null) {
           this.context.doShowScreenSupplyStation(this.context.stations[0], null);
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
                            {this.context.stations.map((element,index) => {
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
                                { this.state.activeTabIndex === 0 ? <SupplyTabContentCalendar element={this.props.chosenStatisticsElement} statistic={this.statistic} /> : null }
                                { this.state.activeTabIndex === 1 ? <SupplyTabContentGraph element={this.props.chosenStatisticsElement} statistic={this.statistic} /> : null }
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


