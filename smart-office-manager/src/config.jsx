/*eslint-disable react/react-in-jsx-scope*/

import Networking from './Model/Networking'
import Moment from "moment";
import React from "react";
import ElementStock from "./Model/ElementStock";

import { sha256 } from 'js-sha256';


class Config{


    static HTTP_REQUEST_STATUS_OK = 200;
    static HTTP_REQUEST_STATUS_CREATED = 201;
    static HTTP_REQUEST_STATUS_BAD_REQUEST = 400;
    static HTTP_REQUEST_STATUS_NO_CONTENT = 204;
    static HTTP_REQUEST_STATUS_NOT_FOUND = 404;


    static LOCATION_ID = "5cec1a164bda4429340dfdbb";
    static API_ROOT = "https://smart-office-backend.herokuapp.com/api/";
    static API_GLOBAL_RETRIEVE = Config.API_ROOT + "admin/locations/";
    static API_PRODUCT_REQUESTS_RETRIEVE = Config.API_ROOT + "admin/requests/all";
    static API_NOTIFICATIONS_RETRIEVE = Config.API_ROOT + "admin/messages/all";
    static API_NOTIFICATIONS_CLEAR = Config.API_ROOT + "messages/filters";
    static API_STOCK_SEND = Config.API_ROOT + "admin/stock/add";
    static API_STOCK_EDIT = Config.API_ROOT + "admin/stock/edit/";




    static ELEMENT_TYPE_CATEGORY = "category";
    static ELEMENT_TYPE_ITEM = "item";
    static ELEMENT_TYPE_SUBCATEGORY = "subcategory";

    static SCREEN_IDENTIFIER_STATIONS = "Stations";
    static SCREEN_IDENTIFIER_STOCK = "Item Stock";
    static SCREEN_IDENTIFIER_STATISTICS = "Supply Statistics";
    static SCREEN_IDENTIFIER_NOTIFICATIONS = "Notifications";
    static SCREEN_IDENTIFIER_REQUESTS = "Product Requests";


    static OPTION_DAY = 1;
    static OPTION_WEEK = 2;
    static OPTION_MONTH = 3;


    static ALERT_TYPE_SUCCESS = "success";
    static ALERT_TYPE_ERROR = "error";


    static generateAppContextValues(scope){
        return {
            stations : scope.state.stations,
            screen : scope.state.sideBarChosen,
            doTreeElementToggle : Config.doTreeElementToggle.bind(scope),
            doChooseElement : Config.doChooseElement.bind(scope),
            doChooseStation : Config.doChooseStation.bind(scope),
            doShowScreenSupplyStation : Config.doShowScreenSupplyStation.bind(scope),

            getChosenStation : Config.getChosenStation.bind(scope),
            getChosenElement : Config.getChosenElement.bind(scope),


            /**
             * ------------------------------------
             *
             * ACTIONS that trigger NETWORKING
             *
             * ------------------------------------
             */


            doActionElementRefillStock : Config.doActionElementRefillStock.bind(scope),
            doActionElementEditStock : Config.doActionElementEditStock.bind(scope),
            doActionElementClearWarnings : Config.doActionElementClearWarnings.bind(scope),
            doActionElementClearWarning : Config.doActionElementClearWarning.bind(scope),
            doActionUniverseParse : Config.doActionUniverseParse.bind(scope),

            /**
             * ------------------------------------
             *
             * PURE NETWORKING FUNCTIONS
             *
             * ------------------------------------
             */

            doNetworkingRefillStock : Networking.doRefillStock.bind(scope),
            doNetworkingEditStock : Networking.doEditStock.bind(scope),
            doNetworkingClearWarning: Networking.doClearWarning.bind(scope),
            doNetworkingClearWarnings: Networking.doClearWarnings.bind(scope),
            doGetStatistics : Networking.doGetStatistics.bind(scope),
            doGetNotifications : Networking.doGetNotifications.bind(scope),
            doGetProductRequests: Networking.doGetProductRequests.bind(scope),
            doGetUniverse: Networking.doGetUniverse.bind(scope),

            /**
             * ------------------------------------
             *
             * DESIGN UTILITIES
             *
             * ------------------------------------
             */
            doToggleMobileDrawer : Config.doToggleMobileDrawer.bind(scope),
            doToggleSideBar : Config.doToggleSideBar.bind(scope),
            doToggleSideBarStatistics : Config.doToggleSideBarStatistics.bind(scope),
            getToggleSideBarStatistics : Config.getToggleSideBarStatistics.bind(scope),

            startLoading : Config.startLoading.bind(scope),
            stopLoading : Config.stopLoading.bind(scope),
            isLoading : Config.isLoading.bind(scope),
            showAlert : Config.showAlert.bind(scope),
            hideAlert : Config.hideAlert.bind(scope),



            globalModals : scope.state.globalModals,
            updateGlobalModal : Config.updateGlobalModal.bind(scope),
            updateGlobalModals  :Config.updateGlobalModals.bind(scope),
            registerGlobalModal : Config.registerGlobalModal.bind(scope),
            showGlobalModal : Config.showGlobalModal.bind(scope),
            hideGlobalModal : Config.hideGlobalModal.bind(scope),

        }
    }




    static doActionUniverseParse(){

        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        Networking.doGetUniverse.bind(scope)().then((initial)=> {


            let data = {...initial};
            let encoded = sha256(JSON.stringify({...initial}));

            console.log(scope.state.initial);
            console.log(encoded);

            if(!Config.isEmpty(scope.state.initial) && scope.state.initial === encoded){
                console.log("Universe was already up to date.");
                return;
            }


            let location = {id : !Config.isEmpty(data["id"]) ? data["id"] : null, name : !Config.isEmpty(data["name"]) ? data["name"] : null};
            let stations = scope.loadStations(data["stations"]);
            let items = scope.getAllItems(stations);
            let notifications = scope.loadNotifications(stations);

            scope.setState({
                /**
                 * Store the initial dataset
                 */
                initial : encoded,
                chosenElement: null,
                chosenStation: null,


                /**
                 * To keep the tree structure separate for the Stations Screen, the Item Stock Screen and the statistics, we will se separate chosen element&station for each one
                 */
                chosenStockElement : null,
                chosenStockStation : null,

                /**
                 * To keep the tree structure separate for the Stations Screen, the Item Stock Screen and the statistics, we will se separate chosen element&station for each one
                 */
                chosenStatisticsElement : null,
                chosenStatisticsStation : null,

                sideBarChosen: Config.SCREEN_IDENTIFIER_STATIONS,
                location: location,
                stations: stations,
                items: items,
                notifications: notifications,
                showConfirmationPopup: false,
                showInputPopup: false,


                isSafeToUpdateUniverse : true,

                /**
                 * The stockHolder will represent an imaginary Station, that will hold every unique item in the platform.
                 * Also, when declaring this, we will compute other "global" data items that we need (e.g. entire stock for each item)
                 */
                stockHolder : scope.createStockHolder(data, stations),


                /**
                 *
                 *
                 * -------------
                 *
                 * DESIGN UTILITIES
                 *
                 * -------------
                 *
                 */


                isMobileDrawerExpanded : false,
                isSideBarExpanded : false,
                isSideBarStatisticsExpanded: false,
                loading : false,
                alert : null,
                globalModals : [],

            });
        });
    }







    static doTreeElementToggle(elementID, force = null){

        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        elementID = String(elementID);

        if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS) {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStation.ID)){
                    scope.state.stations[i].elementsFlat[elementID].activeInStations = ( force!== null ? ( force === 'open') : ! scope.state.stations[i].elementsFlat[elementID].activeInStations);
                }
            }
            scope.setState({
                stations : scope.state.stations
            });
        }
        else if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK){
            scope.state.stockHolder.elementsFlat[elementID].activeInStock = ( force!== null ? ( force === 'open') : ! scope.state.stockHolder.elementsFlat[elementID].activeInStock);

            scope.setState({
                stockHolder : scope.state.stockHolder
            });
        }
        else if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATISTICS) {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStatisticsStation.ID)){
                    scope.state.stations[i].elementsFlat[elementID].activeInStatistics = ( force!== null ? ( force === 'open') : ! scope.state.stations[i].elementsFlat[elementID].activeInStatistics);
                }
            }
            scope.setState({
                stations : scope.state.stations
            });
        }

    }
    static doChooseElement(elementID){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        let chosenElement = null;
        let chosenStockElement = null;

        if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS) {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStation.ID)){

                    Object.keys(scope.state.stations[i].elementsFlat).forEach((key)=>{
                       if(String(key) !== String(elementID)  &&  scope.state.stations[i].elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM)
                           scope.state.stations[i].elementsFlat[key].activeInStations = false;
                    });

                    scope.state.stations[i].elementsFlat[elementID].activeInStations =
                        !scope.state.stations[i].elementsFlat[elementID].activeInStations;

                    chosenElement =  scope.state.stations[i].elementsFlat[elementID].activeInStations ? scope.state.stations[i].elementsFlat[elementID] : null;

                }
            }
            scope.setState({
                stations : scope.state.stations,
                chosenElement : chosenElement
            });
        }
        else if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK){
            Object.keys(scope.state.stockHolder.elementsFlat).forEach((key)=>{
                if(String(key) !== String(elementID)  &&  scope.state.stockHolder.elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM)
                    scope.state.stockHolder.elementsFlat[key].activeInStock = false;
            });

            scope.state.stockHolder.elementsFlat[elementID].activeInStock =
                !scope.state.stockHolder.elementsFlat[elementID].activeInStock;

            chosenStockElement =  scope.state.stockHolder.elementsFlat[elementID].activeInStock ? scope.state.stockHolder.elementsFlat[elementID] : null;
            let chosenStockStation = chosenStockElement !== null && (scope.state.chosenStockElement === chosenStockElement) ? scope.state.chosenStockStation : null;
            scope.setState({
                stations : scope.state.stations,
                chosenStockElement : chosenStockElement,
                chosenStockStation : chosenStockStation,
            });
        }
        else if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATISTICS) {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStatisticsStation.ID)){

                    Object.keys(scope.state.stations[i].elementsFlat).forEach((key)=>{
                        if(String(key) !== String(elementID)  &&  scope.state.stations[i].elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM)
                            scope.state.stations[i].elementsFlat[key].activeInStatistics = false;
                    });

                    scope.state.stations[i].elementsFlat[elementID].activeInStatistics =
                        !scope.state.stations[i].elementsFlat[elementID].activeInStatistics;

                    chosenElement =  scope.state.stations[i].elementsFlat[elementID].activeInStatistics ? scope.state.stations[i].elementsFlat[elementID] : null;

                }
            }
            scope.setState({
                stations : scope.state.stations,
                chosenStatisticsElement : chosenElement,
                isSideBarStatisticsExpanded : false,
            });
        }
    }


    static doChooseStation(station, toggle = true){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;


        if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK) {
            let chosenStation = toggle === true ? (this.state.chosenStockStation === station ? null : station) : station;

            scope.setState({
                chosenStockElement : ( chosenStation !== null && chosenStation.elementsFlat.hasOwnProperty(scope.state.chosenStockElement.ID)) ? chosenStation.elementsFlat[scope.state.chosenStockElement.ID] : scope.state.chosenStockElement,
                chosenStockStation: chosenStation
            });
        }

    }


    static doShowScreenSupplyStation (station, element){


        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        if(element === null && scope.state.chosenStatisticsElement !== null) scope.state.chosenStatisticsElement.activeInStatistics = false;

        if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STATIONS){
            Object.keys(station.elementsFlat).forEach((key) => {
               station.elementsFlat[key].activeInStatistics = station.elementsFlat[key].activeInStations;
            });
        }
        else if(scope.state.sideBarChosen === Config.SCREEN_IDENTIFIER_STOCK){

            if(scope.state.chosenStockStation)
                Object.keys(scope.state.chosenStockStation.elementsFlat).forEach(key=>{
                    scope.state.chosenStockStation.elementsFlat[key].activeInStatistics = false;
                });

            Object.keys(scope.state.stockHolder.elementsFlat).forEach(key => {
                if(scope.state.chosenStockStation.elementsFlat.hasOwnProperty(key))
                {
                    scope.state.chosenStockStation.elementsFlat[key].activeInStatistics = scope.state.stockHolder.elementsFlat[key].activeInStock;
                    /**
                     * In special cases, we won't have the same element-tree for each station, so the
                     * stockHolder will have some interesting behaviors
                     * In order to recreate the collapsed/expanded tree in those cases, we will cover it in a bottom-up manner
                     */
                    let current = scope.state.chosenStockStation.elementsFlat[key];
                    if(current.activeInStatistics){
                        let safety = 30;
                        while(true){
                            if(--safety < 0) break;
                            if(Config.isEmpty(current.parentID) || !scope.state.chosenStockStation.elementsFlat.hasOwnProperty(current.parentID)) break;
                            if(scope.state.chosenStockStation.elementsFlat.hasOwnProperty(current.parentID)){
                                current = scope.state.chosenStockStation.elementsFlat[current.parentID];
                                current.activeInStatistics = true;
                            }
                        }
                    }

                }

            })
        }


        scope.setState({
            stations : scope.state.stations,
            sideBarChosen: "Supply Statistics",
            chosenStatisticsElement: element,
            chosenStatisticsStation: station
        });

    };


    static getChosenElement (screen = Config.SCREEN_IDENTIFIER_STATIONS){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        switch (screen) {
            case Config.SCREEN_IDENTIFIER_STATIONS : return  scope.state.chosenElement;
            case Config.SCREEN_IDENTIFIER_STOCK : return  scope.state.chosenStockElement;
            case Config.SCREEN_IDENTIFIER_STATISTICS : return  scope.state.chosenStatisticsElement;
            default : return null;
        }
    }

    static getChosenStation (screen = Config.SCREEN_IDENTIFIER_STATIONS){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        switch (screen) {
            case Config.SCREEN_IDENTIFIER_STATIONS : return  scope.state.chosenStation;
            case Config.SCREEN_IDENTIFIER_STOCK : return  scope.state.chosenStockStation;
            case Config.SCREEN_IDENTIFIER_STATISTICS : return  scope.state.chosenStatisticsStation;
            default : return null;
        }
    }


    /**
     * ------------------
     *
     * ACTIONS that trigger NETWORKING
     *
     * ------------------
     */


    /**
     * ASYNC because we have to wait for the setState({}) to fully take place before showing the modal
     *
     * @param {Station} station
     * @param {Element} element
     */
    static async doActionElementRefillStock(station, element){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        let modalID = "MODAL-actionElementRefillStock";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            mini : true,
            description : "Add a new quantity of \""+element.name+"\" to this station (#"+station.name+"). Don't forget to add an expiration date if needed.",
            fields : [
                {
                    ID : "quantity",
                    label : "Quantity",
                    placeholder : "Fill in the expected quantity",
                    type : "number"
                },
                {
                    ID : "expiration",
                    label : "Expiration Date",
                    placeholder : "Fill in the expected expiration date",
                    value : Moment().add(1,"days").format("YYYY-MM-DD"),
                    type : "date"
                },
            ],
            buttons : [
                {
                    ID : "confirm",
                    title : "Confirm Refill",
                    callback_click : function(){
                        let flag = false;
                        let quantity = this.getValueFromField("quantity");
                        let expiration = this.getValueFromField("expiration");

                        if(Config.isEmpty(quantity)) {this.toggleWarnForField("quantity",true); flag = true;} else this.toggleWarnForField("quantity",false);
                        if(Config.isEmpty(expiration) || Moment(expiration,"YYYY-MM-DD").isBefore(Moment(),'day')) {this.toggleWarnForField("expiration",true);  flag = true;} else this.toggleWarnForField("expiration",false);


                        if(Moment(expiration,"YYYY-MM-DD").isBefore(Moment(),'day')) {this.toggleWarnForField("expiration",true);return;}
                        if(flag){ this.context.showAlert("Please provide data for all the available inputs.", Config.ALERT_TYPE_ERROR); return; }


                        Networking.doRefillStock.bind(scope)(station, element, quantity , expiration)
                            .then((result)=>{
                                Config.showAlert.bind(scope)("Stock updated!",Config.ALERT_TYPE_SUCCESS);
                                element.stock.push(new ElementStock({
                                    stationId : station.ID,
                                    elementId : element.ID,
                                    quantity : quantity,
                                    expirationDate : expiration
                                }));

                                let stockHolder =  scope.state.stockHolder;

                                element.quantity += parseInt(quantity);
                                stockHolder.elementsFlat[element.ID].quantity += parseInt(quantity);
                                let stations = scope.state.stations;

                                scope.setState({
                                    stations : stations,
                                    stockHolder : stockHolder
                                });
                                this.hide();

                            })
                            .catch(()=>{
                                Config.showAlert.bind(scope)("Server Error",Config.ALERT_TYPE_ERROR);
                            })
                        ;
                    }
                },
                {
                    ID: "close",
                    title: "Cancel",
                    callback_click: function(){this.hide();},
                }
            ]
        });

        await Config.registerGlobalModal.bind(scope)(modal);

        Config.showGlobalModal.bind(scope)(modal.ID);

    }


    /**
     *
     * @param {Station} station
     * @param {Element} element
     */
    static async doActionElementEditStock(station, element){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        let modalID = "MODAL-actionElementEditStock";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            description : "Add a new quantity of \""+element.name+"\" to this station (#"+station.name+"). Don't forget to add an expiration date if needed.",
            customContent : function(){

                let rows = []; for(let item of element.stock)
                {
                    rows.push({
                        "quantity" : {
                            ID : "quantity-"+item.ID,
                            label : "Quantity",
                            placeholder : "Fill in the expected quantity",
                            value : item.quantity,
                            type : "number"
                        },
                        "expirationDate" : {
                            ID : "expirationDate-"+item.ID,
                            label : "Expiration Date",
                            value : item.expirationDateParsed,
                            type : "date"
                        }
                    });
                }

                for(let i = 0 ; i < element.stock.length; i++)  this.fields["stock-"+element.stock[i].ID] = "-";




                return (
                    <div className={"customContent"}>
                        {rows.length === 0
                            ? <div><p>Stock is empty at the moment. Please refill first.</p></div>
                            : rows.map((row, index) => {
                            return (
                                <div key={index}
                                     className={"fieldRow"}
                                     ref={(renderedElement)=>{this.fields["stock-"+element.stock[index].ID] = renderedElement;}}
                                     data-stock={element.stock[index].ID}>
                                    <div data-id={row.quantity.ID} className="field quantity" ref={(renderedElement)=>{ this.fields[row.quantity.ID] = renderedElement; }} data-stock={element.stock[index].ID} >
                                        <label htmlFor={row.quantity.ID}>{row.quantity.label}</label>
                                        <input id={row.quantity.ID} type={Config.sanitize(row.quantity.type,"text")} placeholder={Config.sanitize(row.quantity.placeholder,null)} defaultValue={Config.sanitize(row.quantity.value,null)} />
                                    </div>
                                    <div data-id={row.expirationDate.ID} className="field expiration" ref={(renderedElement)=>{ this.fields[row.expirationDate.ID] = renderedElement; }}  data-stock={element.stock[index].ID} >
                                        <label htmlFor={row.expirationDate.ID}>{row.expirationDate.label}</label>
                                        <input id={row.expirationDate.ID} type={Config.sanitize(row.expirationDate.type,"text")} placeholder={Config.sanitize(row.expirationDate.placeholder,null)} defaultValue={Config.sanitize(row.expirationDate.value,null)} />
                                    </div>
                                    <div data-id={row.expirationDate.ID} className="field action">
                                        <label className={"remove"}>{"Remove"}</label>
                                        <label className={"restore"}>{"Restore"}</label>
                                        <div data-id={row.expirationDate.ID} className="button" onClick={()=>{this.fields["stock-"+element.stock[index].ID].classList.toggle("removed");}}>
                                            <div className={"icon remove"}><i className={"material-icons"}>remove_shopping_cart</i></div>
                                            <div className={"icon restore"}><i className={"material-icons"}>settings_backup_restore</i></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>)

            },
            buttons : [
                {
                    ID : "confirm",
                    title : "Update Stock",
                    callback_click : function(){
                        let result = {};
                        let flag = false;
                        let flagTime = false;

                        Object.keys(this.fields).forEach(key=>{
                            let field = this.fields[key];
                            let stock = field.dataset.stock;
                            if(!result.hasOwnProperty(stock)) result[stock] = {};
                            if(field.classList.contains("fieldRow") && field.classList.contains("removed")){ result[stock].removed = true;}
                            else if(field.classList.contains("field")){
                                if(field.classList.contains("quantity")){
                                    let quantity = this.getValueFromField("quantity-"+stock);
                                    result[stock].quantity = quantity;
                                    if(Config.isEmpty(quantity)) {this.toggleWarnForField("quantity-"+stock,true); flag = true;} else this.toggleWarnForField("quantity-"+stock,false);
                                }
                                else if(field.classList.contains("expiration")){
                                    let expiration = this.getValueFromField("expiration-"+stock);
                                    result[stock].expiration = expiration;
                                    if(Config.isEmpty(expiration)) {this.toggleWarnForField("expiration-"+stock,true); flag = true;}
                                    else {
                                        if(Moment(expiration,"YYYY-MM-DD").isBefore(Moment(),'day')) { this.toggleWarnForField("expiration-"+stock,true); flagTime = true;}
                                        else {

                                            this.toggleWarnForField("expiration-"+stock, false);
                                        }

                                    }
                                }

                            }
                        });


                        console.log(result);

                        if(flagTime) {this.toggleWarnForField("expiration",true);return;}
                        if(flag){ this.context.showAlert("Please provide data for all the available inputs.", Config.ALERT_TYPE_ERROR); return; }

                        Networking.doEditStock.bind(scope)(station.ID, element.ID, []);
                    }
                },
                {
                    ID: "close",
                    title: "Cancel",
                    callback_click: function(){this.hide();},
                }
            ]
        });

        await Config.registerGlobalModal.bind(scope)(modal);

        Config.showGlobalModal.bind(scope)(modal.ID);


    }

    /**
     *
     * @param {Station} station
     * @param {Element} element
     */
    static async doActionElementClearWarnings(station, element){
        /**
         * The scope will be bound to App.js
         */


        let scope = this;
        let modalID = "MODAL-actionElementClearWarnings";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            mini : true,
            description : "Clear all existing warnings/notifications sent for \""+element.name+"\" from this station (#"+station.name+")?",
            buttons : [
                {
                    ID : "remove",
                    title : "Clear All",
                    callback_click : function(){
                        Networking.doClearWarnings.bind(scope)(station, element)
                            .then((result)=>{
                                Config.showAlert.bind(scope)("Warnings/Notifications cleared.",Config.ALERT_TYPE_SUCCESS);
                                element.notifications = [];

                                let list = scope.state.notifications.filter(item =>  item.itemID !== element.ID);
                                element.notifications = element.notifications.filter(item =>  item.itemID !== element.ID);
                                let stockHolder =  scope.state.stockHolder;

                                scope.setState({
                                    notifications : list,
                                    stockHolder : stockHolder
                                });

                                this.hide();
                            })
                            .catch(()=>{
                                Config.showAlert.bind(scope)("Server Error",Config.ALERT_TYPE_ERROR);
                            });
                    }
                },
                {
                    ID: "close",
                    title: "Cancel",
                    callback_click: function(){this.hide();},
                }
            ]
        });

        await Config.registerGlobalModal.bind(scope)(modal);
        Config.showGlobalModal.bind(scope)(modal.ID);






    }


    static doActionElementClearWarning(stationID, itemID, warningID){
        /**
         * The scope will be bound to App.js
         */
        //let scope = this;


       // let requestClearWarning = Config.doClearWarning.bind(scope);
    }








    /**
     *
     *
     * -------------
     *
     * DESIGN UTILITIES
     *
     * -------------
     *
     */

    static doToggleMobileDrawer(force = null){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState((prevState, prevProps) => {
            return { isMobileDrawerExpanded: (force !== null) ? (force === 'open') : !prevState.isMobileDrawerExpanded}
        })

    }

    static doToggleSideBar(force = null){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState((prevState, prevProps) => {
            return {
                isSideBarExpanded: (force !== null) ? (force === 'open') : !prevState.isSideBarExpanded
            }
        });

        if(scope.state.isSideBarExpanded === false || force === 'close') {
           if(scope.state.chosenElement) scope.state.chosenElement.activeInStations = false;
           scope.setState({
               stations : scope.state.stations,
               chosenElement: null,
               chosenStockStation : null,
           })
        }
    }

    static doToggleSideBarStatistics(force = null){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState((prevState, prevProps) => {
            return { isSideBarStatisticsExpanded: (force !== null) ? (force === 'open') : !prevState.isSideBarStatisticsExpanded}
        })

    }

    static getToggleSideBarStatistics(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        return scope.state.isSideBarStatisticsExpanded;
    }

    static startLoading(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState({loading : true});
    }

    static stopLoading(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState({loading : false});
    }

    static isLoading(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        return scope.state.loading;
    }

    static showAlert(text, type = Config.ALERT_TYPE_SUCCESS, time = 2000, callback = ()=>{}){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        if(scope.state.alert !== null) scope.setState({alert : null});

        scope.setState({
            alert : {
                text : text,
                type : type,
                time : time,
                callback : callback
            }
        });
        if(time) {
            setTimeout(() => {
                let hide = Config.hideAlert.bind(scope);
                hide();
                if (!Config.isEmpty(callback) && typeof callback === "function") {
                    callback();
                }
            }, time);
        }
        else if (!Config.isEmpty(callback) && typeof callback === "function")callback();
    }

    static hideAlert(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        if(scope.state.alert !== null) scope.setState({
            alert : null
        });
    }

    /**
     *
     * @param {String} ID
     * @param {*} newData
     */
    static async updateGlobalModal(ID, newData){

        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        let globalModals = [...scope.state.globalModals];
        for(let i = 0; i < globalModals.length; i++) if( globalModals[i].ID === ID ){ globalModals[i] = newData}

        await scope.setState({ globalModals : globalModals});

    }

    static async updateGlobalModals(updatedCollection){

        /**
         * The scope will be bound to App.js
         */
        let scope = this;


        await scope.setState({ globalModals : updatedCollection});

    }

    static async registerGlobalModal(newModal){

        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        for(let globalModal of scope.state.globalModals) if(globalModal.ID === newModal.ID ) {
            await Config.updateGlobalModal.bind(scope)(newModal.ID, newModal);
            return;
        }

        await Config.updateGlobalModals.bind(scope)([...scope.state.globalModals, newModal]);


    }




    static showGlobalModal(ID){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        /**
         *
         * @type {Array<Object>}
         */
        let modals = [...scope.state.globalModals];
        for(let modal of modals) if(modal.ID === ID) {modal.isShowing = true;}
        scope.setState({ globalModals : modals});
    }

    static hideGlobalModal(ID){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        /**
         *
         * @type {Array<Modal>}
         */
        let modals = scope.state.globalModals;
        modals.forEach(element => {if(element.ID === ID) {element.isShowing = false;}});
        scope.setState({ globalModals : modals});
    }


    /**
     * ------------------------------------------
     *
     * UTILS / HELPER
     *
     * ------------------------------------------
     */


    static isEmpty = (value) => {
        try {
            if (value === undefined || typeof value === 'undefined' || value === null) return true; //first check if value is defined and !null

            //case : object
            if (typeof value === 'object') {
                for(let key in value) if(key !== undefined) return false; //check if the object has any values
            }
            //case : array
            else if ( value.constructor === Array) {
                if (value.length !== 0) return false;  //check if the array has positive length
            }
            //case : string/number
            else {
                if (value === "0" || value === 0 || value === false || value === true) return false;
                return (!value || /^\s*$/.test(String(value)));
            }
        }
        catch (err){console.error(err);}

        return true;
    };

    static isFunction = (value) => {
        if(Config.isEmpty(value)) return false;
        return typeof value === "function";
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @param {Boolean} shouldNullify
     * @returns {*|String|int}
     */
    static getValue(object, key, shouldNullify = false){
        if(Config.isDataSetInObject(key, object)) {
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @param {Boolean} shouldNullify
     * @returns {*|Object}
     */

    static getObject(object, key,shouldNullify = false){
        if(Config.isObjectSetInObject(key,object)){
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @param {Boolean} shouldNullify
     * @returns {*|Array}
     */
    static getArray(object, key,shouldNullify = false){
        if(this.isArraySetInObject(key,object)){
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
        }
        return null;
    };

    /**
     *
     * @param array
     * @param {Function} creator - will be a function that will create an object from the variables (e.g. return new Person(someNotParsedObject))
     * @returns {Array}
     */

    static parseArrayElementWithClass(array, creator = function(element, position){return element;}){
        if(array === null || array.length === 0) return [];
        let result = [];
        for(let i = 0; i < array.length; i++){
            result.push(creator(array[i],i));
        }
        return result;
    };
    static isDataSetInObject(key, object){
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return !Config.isEmpty(object[key]);
    }
    static isObjectSetInObject(key, object) {
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return object[key] !== null;
    }
    static isArraySetInObject(key, object) {
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return object[key] !== null && object[key].length > 0;
    }
    static sanitize(value, fallback = ""){
        return Config.isEmpty(value) ? fallback : value;
    }



    /**
     *
     * @param {Object} object
     * @param {String} object.ID
     * @param {String} object.title
     * @param {String=} object.description
     * @param {Function=} object.customContent
     * @param {Function=} object.callback_init
     * @param {Function=} object.callback_show
     * @param {Function=} object.callback_hide
     * @param {Boolean=} object.mini
     *
     *
     * @typedef Field
     * @type {Object}
     * @property {String} ID
     * @property {String} label
     * @property {String} [placeholder]
     * @property {*} [value]
     * @property {String} [type]
     *
     * @param {Array.<Field>} object.fields
     *
     *
     * @typedef Button
     * @type {Object}
     * @property {String} ID
     * @property {String} title
     * @property {String} [subtitle]
     * @property {String} [icon]
     * @property {Function} [callback_init]
     * @property {Function} [callback_click]
     *
     * @param {Array.<Button>} object.buttons
     */

    static createModalObject (object){
        return object;
    }
}


export default Config;