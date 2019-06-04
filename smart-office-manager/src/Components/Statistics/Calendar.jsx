import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import Moment from "moment"
import AppContext from "../../Model/AppContext";
import Config from "../../config";

class Calendar extends PureComponent{



    render() {


        if(!this.props.hasOwnProperty("statistic") || Config.isEmpty(this.props.statistic)) return null;


        let statistic = this.parseStatistic();
        let weekdays =  Moment.weekdays();
        let moment = Moment(this.props.month +"/" + this.props.year, "MM/YYYY");


        let firstDayOfMonth = Moment(moment.clone()).startOf("month").format("d");
        let daysInMonth = moment.clone().daysInMonth();

        let days = Array.from(Array(43).keys()); days.shift();

        return (
            <div className={"CalendarContainer"}>
                <div className={"header"}>
                    {weekdays.map(day =>{
                        return  <div key={day} className={"item"}><p>{day}</p></div>
                    })}
                </div>
                <div className={"body"}>
                    {
                        days.map(day => {
                            let index = day - firstDayOfMonth + 1;
                            if(day < firstDayOfMonth || index > daysInMonth) return <div key={day} className={"item empty"}/>;
                            else{

                                let current = Moment();
                                current.set("year",this.props.year);
                                current.set("month", this.props.month - 1);
                                current.set("date",parseInt(index));
                                let isToday = Moment().format("DD/MM/YYYY") === (current.clone()).format("DD/MM/YYYY");


                                let date = (current.clone()).format("DD/MM/YYYY");
                                let stock = statistic["data"].hasOwnProperty(date) ? statistic["data"][date].stock : "-";
                                let prediction = statistic["data"].hasOwnProperty(date) ? statistic["data"][date].prediction : "-";



                                return <div  key={day}  className={"item"}>
                                    <div className={"day" + (isToday === true ? " now" : "" ) }><p>{index}</p></div>
                                    <div className={"info"}>
                                        <div className={"row stock"}>
                                            <div className={"label"}>
                                                <i title={"Stock"} className={"material-icons"}>layers</i>
                                                <p>Stock: </p>
                                            </div>
                                            <div className={"value"}><p>{stock}</p></div>
                                        </div>
                                        <div className={"row prediction"}>
                                            <div className={"label"}>
                                                <i title={"Prediction"} className={"material-icons"}>show_chart</i>
                                                <p>Prediction: </p>
                                            </div>
                                            <div className={"value"}><p>{prediction}</p></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    parseStatistic = () => {
        console.log(this.props.statistic);
        let data = this.props.statistic.byMonth["data"];
        let object = {};
        for(let i = 0; i < data.length; i++){
            object[data[i]["date"]] = data[i];
        }

        return {
            "monthStart" : this.props.statistic.byMonth["monthStart"],
            "data" : object
        }
    }
}

Calendar.contextType = AppContext;
export default Calendar;