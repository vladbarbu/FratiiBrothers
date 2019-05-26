import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./../../resources/styles/Modal.scss"
import AppContext from "./../../Model/AppContext";
import Config from "./../../config";

class Modal extends Component{

    static contextType = AppContext;
    static propTypes ={
        ID : PropTypes.string.isRequired,
        title :  PropTypes.string.isRequired,
        description : PropTypes.string,
        mini : PropTypes.bool,
        customContent : PropTypes.func,
        callback_init : PropTypes.func,
        callback_show : PropTypes.func,
        callback_hide : PropTypes.func,

        fields : PropTypes.arrayOf(
            PropTypes.shape({
                ID : PropTypes.string.isRequired,
                label : PropTypes.string.isRequired,
                type : PropTypes.string,
                placeholder : PropTypes.string,
                value : PropTypes.oneOfType([PropTypes.string, PropTypes.number,])
            }
        )),
        buttons : PropTypes.arrayOf(
            PropTypes.shape({
                    ID : PropTypes.string.isRequired,
                    title : PropTypes.string.isRequired,
                    subtitle : PropTypes.string,
                    icon : PropTypes.string,
                    callback_init : PropTypes.func,
                    callback_click : PropTypes.func,
                }
            ))
    };
    static defaultProps = {
        descriptions : null,
        customContent : null,
        mini : false,
        callback_init : ()=>{},
        callback_show : ()=>{},
        callback_hide : ()=>{},

        fields : [],
        buttons : [{ID : "close", title : "Close", callback_click : ()=>{ this.parent.hide(); }}]
    };


    constructor(props){

        super(props);
        this.element = React.createRef();
        this.fields = {};

    }

    render() {
        return (
            <div className={"Modal" + (this.props.mini ? " mini" : "")} data-id={this.props.ID} ref={this.element}>
                <div className={"inner"}>
                    <div className={"card"}>
                        <div className={"container"}>
                            <div className={"header"}><h2>{this.props.title}</h2><div className={"button return"} onClick={() => {this.hide();}}>X</div></div>
                            <p>{this.props.description}</p>
                            <form>
                                {this.props.fields.map((data,index) => {
                                    return(
                                        <div data-id={data.ID} key={index} className="field" ref={(element)=>{ this.fields[data.ID] = element; }}>
                                            <label htmlFor={data.ID}>{data.label}</label>
                                            <input id={data.ID} type={Config.sanitize(data.type,"text")} placeholder={Config.sanitize(data.placeholder,null)} defaultValue={Config.sanitize(data.value,null)} />
                                        </div>
                                    )
                                })}
                            </form>
                            { ! Config.isEmpty(this.props.customContent) ? this.props.customContent.bind(this)() : null}
                            <div className={"footer" + ((!Config.isEmpty(this.props.buttons) && this.props.buttons.length === 1) ? " single" : "")}>
                                {this.props.buttons.map((data,index) => {
                                    if(!Config.isFunction(data.callback_click)) data.callback_click = ()=>{};
                                    data.subtitle = Config.isEmpty(data.subtitle) ? data.subtitle : null;

                                    return (
                                        <div key={index}  className="button" data-id={data.ID}  onClick={() => { this.doModalButtonClick(data); }} >
                                            {Config.isEmpty(data.icon) ? (<i className={"material-icons"}>{data.icon}</i>) : null}
                                            <div className="content">
                                                <p>{data.title}</p>
                                                {data.subtitle}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    /**
     *
     *
     * REAL MODAL FUNCTIONALITY
     *
     *
     */
    getValueFromField(fieldID){

        if(!Config.isEmpty(this.fields))
            if(this.fields.hasOwnProperty(fieldID) &&  this.fields[fieldID].dataset.id === fieldID)
                return this.fields[fieldID].querySelector("input").value;

        return null;
    }

    toggleWarnForField(fieldID, force = null){
        if(!Config.isEmpty(this.fields))
            if(this.fields.hasOwnProperty(fieldID) &&  this.fields[fieldID].dataset.id === fieldID) {
                this.fields[fieldID].classList.toggle("warn", (force === null ? null : (force)));
            }

    }

    doModalButtonClick(data){
        /**
         * Don't use Arrow Function when declaring the Modal Object as we want to bind the scope of the Modal Component.
         * By doing that, it won't keep the scope of the declaring context
         */
        data.callback_click.bind(this)();
    }


    /**
     *
     *
     * MODAL UTILITIES
     *
     *
     */

    hide(){
        this.context.hideGlobalModal(this.props.ID);
        this.props.callback_hide(this);
    }

    show(){
        this.props.callback_show(this);
        this.context.showGlobalModal(this.props.ID);
    }


    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("touchstart", this.handleClickOutside);
        if(Config.isFunction(this.props.callback_init)) this.props.callback_init();
        for(let button of this.props.buttons){
            if(!Config.isEmpty(button) && Config.isFunction(button.callback_init))
                button.callback_init.bind(this)();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("touchstart", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.element && !this.element.contains(event.target)) {this.hide();}
    }












}

export default Modal;