import axios from "axios";
import Element from "./model/Element";

class Config{

    static HTTP_REQUEST_STATUS_OK = 200;
    static HTTP_REQUEST_STATUS_CREATED = 201;
    static HTTP_REQUEST_STATUS_BAD_REQUEST = 400;
    static HTTP_REQUEST_STATUS_NO_CONTENT = 204;
    static HTTP_REQUEST_STATUS_NOT_FOUND = 404;



    static  ELEMENT_TYPE_CATEGORY = "category";
    static  ELEMENT_TYPE_ITEM = "item";


    static STATION_ID = "5cd986206f8e6204ec99786e";
    static API_GLOBAL_RETRIEVE = "https://smart-office-backend.herokuapp.com/api/user/station/";
    static API_REQUEST_SEND = "https://smart-office-backend.herokuapp.com/api/user/requests/";
    static API_NOTIFICATION_SEND = "https://smart-office-backend.herokuapp.com/api/user/notifications/";




    static loadElementsFromAPI = () => {
        return new Promise((resolve, reject) => {
            axios.get(Config.API_GLOBAL_RETRIEVE + Config.STATION_ID)
                .then((response) => {
                    try {
                        let status = response["status"];
                        if (parseInt(status) === Config.HTTP_REQUEST_STATUS_OK){
                            console.log(response);
                            resolve(response["data"]);
                        }
                    }catch (e) {
                        console.error("Parsing error at load.");
                        console.error(e);
                        reject();
                    }



                })
                .catch((error) => {
                    console.log(error);
                    reject();
                })
                .finally(() => {
                    // always executed
                });
        })

    };








    static generateAppContextValues = (globalScope) => {
        return {
            station : globalScope.state.station,
            doChangeIsSafeToUpdateUniverse : (value) => { globalScope.setState({isSafeToUpdateUniverse : (value === true)})},
            doGetIsSafeToUpdateUniverse : () => {return globalScope.state.isSafeToUpdateUniverse},
            doUpdateUniverse : globalScope.doUpdateUniverse.bind(globalScope),
            startLoading : () => { globalScope.setState({loading : true}); },
            stopLoading : () => { globalScope.setState({loading : false}); },
            doNotificationSend : globalScope.doNotificationSend.bind(globalScope)
        }
    };

    /**
     * Parsing utils
     */


    static loadNotifications = items => {
        let notifications = [];
        for (let i = 0; i < items.length; i++)
            for (let j = 0; j < items[i].notifications.length; j++)
                notifications.push(items[i].notifications[j]);
        return notifications;
    };

    static loadItems = elements => {
        let items = [];
        for (let i = 0; i < elements.length; i++)
            if (elements[i].type === "category") {
                let sub_elements = this.loadItems(elements[i].elements);
                for (let j = 0; j < sub_elements.length; j++) items.push(sub_elements[j]);
            } else {
                items.push(elements[i]);
            }
        return items;
    };


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


    /**
     * Deprecated
     */

    loadElementsFromLocal = () => {

        /**
         * Load our array of elements from the json file
         * Will be replaced by a request once networking is done
         */
        try {
            let elements = require("./resources/data/elements.json");
            if (elements) {
                let data = [];
                for (let i = 0; i < elements.length; i++) {
                    data.push(new Element(elements[i]));
                }
                return data;
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    };


}
export default Config;

