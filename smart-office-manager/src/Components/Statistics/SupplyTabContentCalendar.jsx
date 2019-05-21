import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
import Calendar from "./Calendar";
import Moment from "moment"


class SupplyTabContentCalendar extends PureComponent {


    constructor(props){
        super(props);


        this.state = {
            month : parseInt(Moment().format("M")),
            year : parseInt(Moment().format("YYYY"))
        }
    }

    render() {
        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;

        if(!element) return( <div className={"SupplyTabContent graph"}><p className={"disclaimer"}>The supply graphs and charts are not available yet. To preview a dataset please begin by picking an item from the right panel.</p></div>);

        let months = Moment.months();

        return (
            <div className={"SupplyTabContent Calendar"}>
                <div className={"header"}>
                    <span className={"sectionTitle"}>Item</span>
                    <Tree minimal = {true} elements = {[element]} />
                    <span className={"sectionTitle"}>Options</span>
                    <div className={"time"}>
                        <div className={"option active"} >
                            <div className={"label"}><p>Year</p></div>
                            <div className={"value"}>
                                <select defaultValue={this.state.year} onChange={(e)=>{this.doPickTime(this.state.month, e.target.options[e.target.selectedIndex].value)}}>
                                    {Array.from(Array(15).keys()).map(key=>{
                                        let value = 2010 + key;
                                        return (<option key={value}  value={value}>{value}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={"option active"} >
                            <div className={"label"}><p>Month</p></div>
                            <div className={"value"}>
                                <select  defaultValue={this.state.month} onChange={(e)=>{this.doPickTime( e.target.options[e.target.selectedIndex].value, this.state.year)}}>
                                    {Array.from(Array(12).keys()).map(key=>{
                                        return <option key={key+1}  value={key+1}>{months[key]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"canvas"}>
                    <span className={"sectionTitle"}><i className="material-icons">calendar_today</i> Stock vs. Prediction Calendar</span>
                    <Calendar statistic={this.props.statistic} month={this.state.month} year={this.state.year}/>
                </div>



            </div>
        )
    }


    doPickTime(month,year){
        this.setState({
            month : parseInt(month),
            year : parseInt(year)
        })
    }
}
SupplyTabContentCalendar.contextType = AppContext;
export default SupplyTabContentCalendar;