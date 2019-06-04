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
        activeTabIndex : 0,
        barRef : null,
        doughnutRef : null,
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
                                { this.state.activeTabIndex === 0 ? <SupplyTabContentCalendar station={this.props.chosenStatisticsStation}   element={this.props.chosenStatisticsElement}/> : null }
                                { this.state.activeTabIndex === 1 ? <SupplyTabContentGraph station={this.props.chosenStatisticsStation}   element={this.props.chosenStatisticsElement}  updateGraphComponents={this.updateGraphComponents}  /> : null }
                            </div>
                        </div>

                    </div>
                </div>


                <SideBarStatistics isSideBarStatisticsExpanded={this.props.isSideBarStatisticsExpanded}  chosenStatisticsStation={this.props.chosenStatisticsStation}  resizeGraphComponents={this.resizeGraphComponents} />
            </div>
        )
    }

    doChooseTab = (index) => {

        this.setState({
            activeTabIndex : index,
        });
    };



    updateGraphComponents= (barRef, doughnutRef) => {
       this.setState({
           barRef : barRef,
           doughnutRef :  doughnutRef,
       });
    };

    resizeGraphComponents = () => {
        try{
            setTimeout(()=>{
                if(this.state.barRef && !Config.isEmpty(this.state.barRef.current) && !Config.isEmpty(this.state.barRef.current.chartInstance)) this.state.barRef.current.chartInstance.resize();
                if(this.state.doughnutRef && !Config.isEmpty(this.state.doughnutRef.current) && !Config.isEmpty(this.state.doughnutRef.current.chartInstance)) this.state.doughnutRef.current.chartInstance.resize();
            }, 300);

        }
        catch (e) {
            console.error(e);
        }
    }


}

ScreenStatistics.contextType = AppContext;
export default ScreenStatistics;


