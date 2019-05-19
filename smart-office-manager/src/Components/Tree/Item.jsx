import React, { PureComponent } from "react";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "./Tree";
import StationList from "./StationList";


class Item extends PureComponent{






    render() {
        let active =
            this.context.screen ===  Config.SCREEN_IDENTIFIER_STATIONS ?
                this.props.element.activeInStations :
                (this.context.screen ===  Config.SCREEN_IDENTIFIER_STOCK ?
                        this.props.element.activeInStock :
                        (this.context.screen ===  Config.SCREEN_IDENTIFIER_STATISTICS ?
                            this.props.element.activeInStatistics : false)
                );

        return (
            <div className={"Item"}>
                <div className={"card" + (active ? " active" : "") } onClick={()=>{ this.context.doChooseElement(this.props.element.ID); }}  >
                    <div className={"icon"}><i className={"material-icons"}>subdirectory_arrow_right</i></div>
                    <div className={"image"}><img alt={this.props.element.name} src={require("./../../resources/" + this.props.element.image)}/></div>
                    <div className={"content"}>
                        <p className={"label"}>Item:</p>
                        <p className={"title"}>{this.props.element.name}</p>
                        <div className={"data"}>
                            <div className={"stock"}>
                                <i className={"material-icons"}>layers</i>
                                <p>{this.props.element.quantity + " in stock"}</p>
                            </div>
                            {!Config.isEmpty(this.props.element.notifications) && this.props.element.notifications.length > 0 ? <div className={"warn"}><p>New warnings</p></div> : null}

                        </div>
                    </div>
                    <div className={"action"}>
                        <div className={"icon"}>
                            <i className={"material-icons"}>arrow_forward</i>
                        </div>
                        <div className={"icon minimal"}>
                            <i className={"material-icons"}>offline_bolt</i>
                        </div>
                    </div>
                    {  (this.context.screen ===  Config.SCREEN_IDENTIFIER_STOCK ) ? <div className={"toggle" }><div className={"icon"}><img alt={"Toggle"} src={require("./../../resources/images/icon/ic_keyboard_arrow_down_grey.svg")}/></div></div> : null}
                </div>
                { (this.context.screen ===  Config.SCREEN_IDENTIFIER_STOCK ) && active ?
                    <div className={"innerTree"}>
                        <StationList stations={this.context.stations} />
                    </div>
                    : null}


            </div>);
    }


}

Item.contextType = AppContext;
export default Item;