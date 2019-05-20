import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
import {Bar} from "react-chartjs-2";
class SupplyTabContentCalendar extends PureComponent {

    state = {
        option : Config.OPTION_MONTH
    };

    render() {
        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;

        if(!element) return( <div className={"SupplyTabContent graph"}><p className={"disclaimer"}>The supply graphs and charts are not available yet. To preview a dataset please begin by picking an item from the right panel.</p></div>);


        return (
            <div className={"SupplyTabContent Calendar"}>
                <div className={"header"}>
                    <span className={"sectionTitle"}>Item</span>
                    <Tree minimal = {true} elements = {[element]} />
                    <span className={"sectionTitle"}>Options</span>
                    <div className={"time"}>
                        <div className={"option active"} >
                            <div className={"label"}><p>Month</p></div>
                            <div className={"value"}>
                                <select>
                                    <option name={1}>January</option>
                                    <option name={2}>February</option>
                                    <option name={3}>March</option>
                                    <option name={4}>April</option>
                                    <option name={5}>May</option>
                                    <option name={6}>June</option>
                                    <option name={7}>July</option>
                                    <option name={8}>August</option>
                                    <option name={9}>September</option>
                                    <option name={10}>October</option>
                                    <option name={11}>November</option>
                                    <option name={12}>December</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"canvas"}>
                    <span className={"sectionTitle"}><i className="material-icons">calendar_today</i> Stock vs. Prediction Calendar</span>

                </div>



            </div>
        )
    }
}
SupplyTabContentCalendar.contextType = AppContext;
export default SupplyTabContentCalendar;