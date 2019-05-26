/*eslint-disable react/react-in-jsx-scope*/

import Networking from './Model/Networking'
import Moment from "moment";
import React from "react";




class Config{
    static  ELEMENT_TYPE_CATEGORY = "category";
    static  ELEMENT_TYPE_ITEM = "item";
    static  ELEMENT_TYPE_SUBCATEGORY = "subcategory";

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
            case Config.SCREEN_IDENTIFIER_STATISTICS : return  scope.state.chosenStockElement;
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
            case Config.SCREEN_IDENTIFIER_STATISTICS : return  scope.state.chosenStockStation;
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
     * @param {Element} item
     */
    static async doActionElementRefillStock(station, item){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        let modalID = "MODAL-actionElementRefillStock";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            mini : true,
            description : "Add a new quantity of \""+item.name+"\" to this station (#"+station.name+"). Don't forget to add an expiration date if needed.",
            fields : [
                {
                    ID : "quantity",
                    label : "Item Quantity",
                    placeholder : "Fill in the expected quantity",
                    type : "number"
                },
                {
                    ID : "expiration",
                    label : "Item Expiration Date",
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


                        Networking.doRefillStock.bind(scope)(station.ID, item.ID, quantity , expiration);
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
     * @param {Element} item
     */
    static async doActionElementEditStock(station, item){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        let modalID = "MODAL-actionElementEditStock";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            description : "Add a new quantity of \""+item.name+"\" to this station (#"+station.name+"). Don't forget to add an expiration date if needed.",
            customContent : function(){
                let data = [
                    {stockID : "1sadasd", quantity : 8, expiration : "2019-09-01"},
                    {stockID : "221s3", quantity : 3, expiration : "2019-10-01"},
                    {stockID : "3xzcxz", quantity : 4, expiration : "2019-11-01"},
                    {stockID : "4sadsa", quantity : 19, expiration : "2019-11-02"},
                ];
                let rows = []; for(let item of data) rows.push({
                        "quantity" : {
                            ID : "quantity-"+item.stockID,
                            label : "Item Quantity",
                            placeholder : "Fill in the expected quantity",
                            value : item.quantity,
                            type : "number"
                        },
                        "expiration" : {
                            ID : "expiration-"+item.stockID,
                            label : "Item Expiration Date",
                            value : item.expiration,
                            type : "date"
                        }
                    });
                console.log(this);


                return (
                    <div className={"customContent"}>
                        {rows.map((row, index) => {
                            return (
                                <div key={index} className={"fieldRow"} ref={(element)=>{ this.fields["stock-"+data[index].stockID] = element; }} data-stock={data[index].stockID}>
                                    <div data-id={row.quantity.ID} className="field quantity" ref={(element)=>{ this.fields[row.quantity.ID] = element; }} data-stock={data[index].stockID} >
                                        <label htmlFor={row.quantity.ID}>{row.quantity.label}</label>
                                        <input id={row.quantity.ID} type={Config.sanitize(row.quantity.type,"text")} placeholder={Config.sanitize(row.quantity.placeholder,null)} defaultValue={Config.sanitize(row.quantity.value,null)} />
                                    </div>
                                    <div data-id={row.expiration.ID} className="field expiration" ref={(element)=>{ this.fields[row.expiration.ID] = element; }}  data-stock={data[index].stockID} >
                                        <label htmlFor={row.expiration.ID}>{row.expiration.label}</label>
                                        <input id={row.expiration.ID} type={Config.sanitize(row.expiration.type,"text")} placeholder={Config.sanitize(row.expiration.placeholder,null)} defaultValue={Config.sanitize(row.expiration.value,null)} />
                                    </div>
                                    <div data-id={row.expiration.ID} className="field action">
                                        <label className={"remove"}>{"Remove"}</label>
                                        <label className={"restore"}>{"Restore"}</label>
                                        <div data-id={row.expiration.ID} className="button" onClick={()=>{this.fields["stock-"+data[index].stockID].classList.toggle("removed");}}>
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

                        Networking.doEditStock.bind(scope)(station.ID, item.ID, []);
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
     * @param {Element} item
     */
    static async doActionElementClearWarnings(station, item){
        /**
         * The scope will be bound to App.js
         */
       // let scope = this;


        //let requestClearWarnings = Networking.doClearWarnings.bind(scope);


        let scope = this;
        let modalID = "MODAL-actionElementClearWarnings";


        let modal = Config.createModalObject({
            ID : modalID,
            title : "Refill Stock",
            mini : true,
            description : "Clear all existing warnings/notifications sent for \""+item.name+"\" from this station (#"+station.name+")?",
            buttons : [
                {
                    ID : "remove",
                    title : "Clear All",
                    callback_click : function(){
                        Networking.doClearWarnings.bind(scope)(station.ID, item.ID);
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