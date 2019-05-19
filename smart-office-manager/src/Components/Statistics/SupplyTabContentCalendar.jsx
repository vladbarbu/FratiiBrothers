import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
class SupplyTabContentCalendar extends PureComponent {

    render() {
        return (
            <div className={"SupplyTabContent calendar"}>
                {!Config.isEmpty(this.props.element) ? <Tree minimal = {true} elements = {[this.props.element]} /> : null }
            </div>
        )
    }
}
SupplyTabContentCalendar.contextType = AppContext;
export default SupplyTabContentCalendar;