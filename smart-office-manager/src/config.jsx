class Config{
    static  ELEMENT_TYPE_CATEGORY = "category";
    static  ELEMENT_TYPE_ITEM = "item";
    static  ELEMENT_TYPE_SUBCATEGORY = "subcategory";

    static SCREEN_IDENTIFIER_STATIONS = "Stations";
    static SCREEN_IDENTIFIER_STOCK = "Item Stock";
    static SCREEN_IDENTIFIER_STATISTICS = "Supply Statistics";
    static SCREEN_IDENTIFIER_NOTIFICATIONS = "Notifications";
    static SCREEN_IDENTIFIER_REQUESTS = "Product Requests";



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
        }
    }

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

            scope.setState({
                stations : scope.state.stations,
                chosenStockElement : chosenStockElement
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
                chosenStatisticsElement : chosenElement
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


}



















export default Config;