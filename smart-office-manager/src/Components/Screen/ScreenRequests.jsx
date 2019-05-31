import React, { Component } from "react";
import AppContext from "../../Model/AppContext";
import './../../resources/styles/Request.scss'
import Config from "../../config";
import SRequest from "../../Model/SRequest";

class ScreenRequests extends Component {

    constructor(props){
        super(props);
        /**
         *
         * @type {{productRequests: Array<SRequest>}}
         */
        this.state = {
            productRequests : [],
            localLoading : false,
        }
    }

    componentDidMount() {
        console.log("Mounted Screen Requests");
        this.loadRequests();
    }





    render() {
        return (
            <div className = {"ScreenRequests"}>
                <div className = {"sectionTitle"}>
                    <i className={"material-icons"}>folder_shared</i><p> Product Requests</p>
                </div>
                <div className={"requestsList"}>
                    {this.printRequests()}
                </div>

            </div>
        );
    }

    loadRequests(){
        this.setState({localLoading : true});
        this.context.doGetProductRequests().then(list => {
            this.setState({
                productRequests :  Config.parseArrayElementWithClass(list, (element)=>{return new SRequest(element)}),
                localLoading : false
            });
            this.context.stopLoading();

        });
    }


    printRequests(){
        if(this.state.localLoading && (Config.isEmpty(this.state.productRequests) || this.state.productRequests.length === 0))
            return (<div  className={"request-item loading"}><div className={"content"}><div className={"icon"}><i className={"material-icons"}>refresh</i></div><p>Loading latest results</p></div></div>);
        else if(Config.isEmpty(this.state.productRequests) ||  this.state.productRequests.length === 0)
            return (
                <div  className={"request-item empty"}><div className={"content"}><div className={"icon"}><i className={"material-icons"}>not_interested</i></div><p>No results available for now</p><div onClick={()=>{         this.context.startLoading(); setTimeout(()=>{ this.loadRequests()}, 1500)}} className={"button refresh"}><div className={"content"}><p>Refresh</p></div></div></div></div>);
        else return (
            this.state.productRequests.map((request,key) => {
                return (<div key={key} className={"request-item"}>
                    <div className={"content"}>
                        <div className={"header"}><p>Request</p><span>#{request.ID}</span></div>
                        <div className={"body"}>
                            {!Config.isEmpty(request.createdAt) && !Config.isEmpty(request.createdAtParsed) ? <div className={"row"}><div className={"icon"}><i className={"material-icons"}>date_range</i></div><p>{request.createdAtParsed}</p></div> : null}
                            {!Config.isEmpty(request.name) ? <div className={"row"}><div className={"icon"}><i className={"material-icons"}>new_releases</i></div><p>{request.name}</p></div> : null}
                            {!Config.isEmpty(request.description) ? <div className={"row"}><div className={"icon"}><i className={"material-icons"}>description</i></div><p>{request.description}</p></div> : null}
                            {!Config.isEmpty(request.badge) ? <div className={"row"}><div className={"icon"}><i className={"material-icons"}>person</i></div><p>{request.badge}</p></div> : null}
                        </div>
                    </div>
                </div>)
            }))
    }
}

ScreenRequests.contextType = AppContext;
export default ScreenRequests;