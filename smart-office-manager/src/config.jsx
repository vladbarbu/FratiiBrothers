class Config{
    static  ELEMENT_TYPE_CATEGORY = "category";
    static  ELEMENT_TYPE_ITEM = "item";
    static  ELEMENT_TYPE_SUBCATEGORY = "subcategory";



    static generateAppContextValues(scope){
        return {
            doTreeElementToggle : Config.doTreeElementToggle.bind(scope),
            doChooseStationsElement : Config.doChooseStationsElement.bind(scope),
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

        if(scope.state.sideBarChosen === "Stations") {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStation.ID)){
                    scope.state.stations[i].elementsFlat[elementID].activeInStations = ( force!== null ? ( force === 'open') : ! scope.state.stations[i].elementsFlat[elementID].activeInStations);
                }
            }
            scope.setState({
                stations : scope.state.stations
            });
        }

    }


    static doChooseStationsElement(elementID){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;
        console.log(scope);
        console.log(elementID);

        let chosenElement = null;

        if(scope.state.sideBarChosen === "Stations") {
            for (let i = 0; i < scope.state.stations.length; i++) {
                if (String(scope.state.stations[i].ID) === String(scope.state.chosenStation.ID)){

                    Object.keys(scope.state.stations[i].elementsFlat).forEach((key)=>{
                       if(String(key) !== String(elementID)  &&  scope.state.stations[i].elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM)
                           scope.state.stations[i].elementsFlat[key].activeInStations = false;
                    });

                    scope.state.stations[i].elementsFlat[elementID].activeInStations =
                        !scope.state.stations[i].elementsFlat[elementID].activeInStations;

                    chosenElement =   scope.state.stations[i].elementsFlat[elementID].activeInStations ? scope.state.stations[i].elementsFlat[elementID] : null;
                }
            }
            scope.setState({
                stations : scope.state.stations,
                chosenElement : chosenElement
            });
        }
    }
}



















export default Config;