import React, { PureComponent } from "react";
import Config from "../../config";
import Tree from "./Tree";
import AppContext from "../../Model/AppContext";




class Subcategory extends PureComponent{


    render() {
        return (
            <div className={"Subcategory"}>

            <div className={"card" +  (this.props.element.activeInStations ? " active" : "")} onClick={() => {this.context.doTreeElementToggle(this.props.element.ID);}}  >
                <div className={"icon"}><i className={"material-icons"}>subdirectory_arrow_right</i></div>
                <div className={"image"}><img alt={this.props.element.name} src={require("./../../resources/" + this.props.element.image)}/></div>
                <div className={"content"}>
                    <p className={"label"}>Subcategory:</p>
                    <p className={"title"}>{this.props.element.name}</p>
                </div>
                {!Config.isEmpty(this.props.element.elements) ? <div className={"toggle" }><div className={"icon"}><img alt={"Toggle"} src={require("./../../resources/images/icon/ic_keyboard_arrow_down_grey.svg")}/></div></div> : null}
            </div>
                { !Config.isEmpty(this.props.element.elements) && this.props.element.activeInStations ?
                    <div className={"innerTree"}><Tree elements={this.props.element.elements} /></div> : null}

        </div>);
    }


}

Subcategory.contextType = AppContext;
export default Subcategory;