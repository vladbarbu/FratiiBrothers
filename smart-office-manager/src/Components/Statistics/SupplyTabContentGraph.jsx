import React, { Component } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
import Moment from "moment"
import Graph from "./Graph";
import SupplyTabContentCalendar from "./SupplyTabContentCalendar";




class SupplyTabContentGraph extends Component {

    state = {
        statistic : null,
        option : Config.OPTION_MONTH,
        now : {
            day :  Moment().format("YYYY-MM-DD"),
            week : Moment().format("YYYY-[W]WW"),
            weekStartDay : Moment().startOf("week").format("YYYY-MM-DD"),
            month : parseInt(Moment().format("M")),
            year :  parseInt(Moment().format("YYYY")),
        },
        byDay : Moment().format("YYYY-MM-DD"),
        byWeek : Moment().format("YYYY-[W]WW"),
        byMonth : Moment().format("MMMM") +" " + Moment().format("YYYY"),
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(
            this.state.option === nextState.option
            && this.state.byDay === nextState.byDay
            && this.state.byWeek === nextState.byWeek
            && this.state.byMonth === nextState.byMonth
            )
    }

    componentDidMount() {
        this.updateStatistic();
    }


    render() {


        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;
        if(!element) return( <div className={"SupplyTabContent graph"}><p className={"disclaimer"}>The supply graphs and charts are not available yet. To preview a dataset please begin by picking an item from the right panel.</p></div>);


        let graphProps = {
            statistic : this.state.statistic,
            option : this.state.option,
            now : this.state.now,
            byDay : this.state.byDay,
            byWeek : this.state.byWeek,
            byMonth : this.state.byMonth,
            updateGraphComponents : this.props.updateGraphComponents
        };



        return (
            <div className={"SupplyTabContent Graph"}>
                <div className={"header"}>
                    <span className={"sectionTitle"}>Item</span>
                    <Tree minimal = {true} elements = {[element]} />
                    <span className={"sectionTitle"}>Options</span>
                    <div className={"time"}>
                        {/*<div className={"option" + (this.state.option === Config.OPTION_DAY ? " active" : "")} onClick={() => this.doOptionChange(Config.OPTION_DAY)}>*/}
                        {/*    <div className={"label"}><p>By Day</p></div>*/}
                        {/*    <div className={"value"}><input onChange={(e)=>{this.setState({byDay : e.target.value}); this.updateStatistic();}} defaultValue={this.state.now.day} type={"date"} placeholder={"Today"}/></div>*/}
                        {/*</div>*/}
                        <div className={"option" + (this.state.option === Config.OPTION_WEEK? " active" : "")} onClick={() => this.doOptionChange(Config.OPTION_WEEK)}>
                            <div className={"label"}><p>By Week</p></div>
                            <div className={"value"}><input onChange={(e)=>{this.setState({byWeek : e.target.value}); this.updateStatistic();}}  defaultValue={this.state.now.week} type={"week"} /></div>
                        </div>
                        <div className={"option" + (this.state.option === Config.OPTION_MONTH ? " active" : "")} onClick={() => this.doOptionChange(Config.OPTION_MONTH)}>
                            <div className={"label"}><p>By Month</p></div>
                            <div className={"value"}>
                                <select defaultValue={this.state.byMonth} onChange={(e)=>{ this.setState({byMonth : e.target.options[e.target.selectedIndex].value,}); this.updateStatistic();  }}>
                                    {this.printYearOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"canvas"}>
                   <Graph station={this.props.chosenStatisticsStation}   {...graphProps} />
                </div>
            </div>
        )
    }

    printYearOptions(){
        let year = 2010;
        let month = 0;

        return Array.from(Array(300).keys()).map(key=>{
            if(++month > 12) {month = 1;year++;}
            let label = Moment().month(month).format("MMMM")+" "+year;
            return <option key={label}  value={label}>{label}</option>
        });

    }

    doOptionChange(option){
        this.setState({
            option : option
        })
    }



    updateStatistic(){

        let date = "";
        switch (this.state.option) {
            case Config.OPTION_DAY : date = this.state.byDay; break;
            case Config.OPTION_WEEK : date = Moment(this.state.byWeek,"YYYY-[W]WW").startOf("week").format("YYYY-MM-DD"); break;
            case Config.OPTION_MONTH : date = Moment(this.state.byMonth , "MMMM YYYY").startOf("month").format("YYYY-MM-DD"); break;
            default : break;
        }

        this.context.startLoading();
        this.context.doGetStatistics(
            this.state.option,
            date,
            Config.isEmpty(this.props.element)  ? null : this.props.element.ID,
            Config.isEmpty(this.props.station) ? null :  this.props.station.ID,
           ).then((statistic)=>{
            console.log(statistic);
            this.setState({
                statistic : statistic
            })
        }).catch((error) => {
            console.log(error);
            this.context.showAlert("Server error",Config.ALERT_TYPE_ERROR);
        }).finally(()=>{ this.context.stopLoading();})


    }


}

SupplyTabContentGraph.contextType = AppContext;
export default SupplyTabContentGraph;