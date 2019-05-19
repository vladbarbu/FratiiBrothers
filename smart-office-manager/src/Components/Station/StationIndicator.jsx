import React, { PureComponent } from "react";
import "../../resources/styles/Station.scss";
import AppContext from "../../Model/AppContext";
class StationIndicator extends PureComponent {

    render() {
        return (
            <div
                className={"StationIndicator" + (this.props.station.hasWarning ? " warn" : "") + (this.props.active ? " active" : "")}
                onClick={()=>{
                    this.context.doShowScreenSupplyStation(this.props.station, null);
                    this.context.doToggleSideBarStatistics("open");
                }}
            >
                <div className={"icon"}>
                    <i className={"material-icons"}>ev_station</i>
                </div>
                <div className={"floor"}><p>Floor {this.props.station.floor}</p></div>
                <div className={"title"}><p>{"#" + this.props.station.name}</p></div>
                <div className={"indicator"}><i className={"material-icons"}>arrow_drop_up</i></div>
            </div>
        )
    }
}
StationIndicator.contextType = AppContext;
export default StationIndicator;