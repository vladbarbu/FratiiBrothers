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
            screen : scope.state.sideBarChosen,
            doTreeElementToggle : Config.doTreeElementToggle.bind(scope),
            doChooseElement : Config.doChooseElement.bind(scope),
            doShowScreenSupplyStation : Config.doShowScreenSupplyStation.bind(scope),
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
        console.log(scope);
        console.log(elementID);

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
                    scope.state.stockHolder.elementsFlat[key].activeInStations = false;
            });

            scope.state.stockHolder.elementsFlat[elementID].activeInStations =
                !scope.state.stockHolder.elementsFlat[elementID].activeInStations;

            chosenStockElement =  scope.state.stockHolder.elementsFlat[elementID].activeInStations ? scope.state.stockHolder.elementsFlat[elementID] : null;

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


    static doShowScreenSupplyStation (station, element){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        scope.setState({
            sideBarChosen: "Supply Statistics",
            chosenStatisticsElement: element,
            chosenStatisticsStation: station
        });

    };
}



















export default Config;