import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
class SupplyTabContentCalendar extends PureComponent {

    render() {
        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;


        return (
            <div className={"SupplyTabContent Calendar"}>
                {element
                    ? <Tree minimal = {true} elements = {[element]} />
                    : <p className={"disclaimer"}>The supply calendar is not available yet. To preview a dataset please begin by picking an item from the right panel.</p>
                }
            </div>
        )
    }
}
SupplyTabContentCalendar.contextType = AppContext;
export default SupplyTabContentCalendar;