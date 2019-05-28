import Moment from "moment"
import axios from "axios";
import Config from "./../config"

class Networking {

    /**
     *
     * @param stationID
     * @param itemID
     * @param quantity
     * @param expirationDate
     */
    static doRefillStock(stationID, itemID, quantity, expirationDate){
        let scope = this;
        console.log(scope);

        console.log("Refill on Station" + stationID + ", Item " + itemID + " with Q "+quantity +" and EXP "+expirationDate);
    }


    /**
     * Updates the stock fields
     * @param stationID
     * @param itemID
     * @param {Array.<{quantity: int, expirationDate: String}>} stockCollection
     */
    static doEditStock(stationID, itemID, stockCollection){

    }


    /**
     * Clears warnings
     * @param stationID
     * @param itemID
     */
    static doClearWarnings(stationID, itemID){

    }

    /**
     *
     * @param stationID
     * @param itemID
     * @param warningID
     * @return {Promise<*>}
     */
    static doClearWarning(stationID,itemID,warningID){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;

        return new Promise((resolve, reject) => {
            resolve(scope);
        });
    }


    /**
     *
     * @param option
     * @param date
     * @param itemID
     * @param stationID
     * @return {Promise<any>}
     */
    static doGetStatistics(option, date,itemID, stationID){

        /**
         * Temporary local dataset
         */


        return new Promise((resolve, reject) =>{

            try {

                let sourceFormat = "YYYY-MM-DD";

                let day = Moment(date, sourceFormat).format("DD/MM/YYYY");
                let startOfWeek = Moment(date, sourceFormat).startOf("week").format("DD/MM/YYYY");
                let startOfMonth = Moment(date, sourceFormat).startOf("month").format("DD/MM/YYYY");

                let dayStartOfWeekOnly = parseInt(Moment(date, sourceFormat).startOf("week").format("DD"));
                let monthOnly = Moment(date, sourceFormat).format("MM/YYYY");


                let daysInMonth = Moment(date, sourceFormat).daysInMonth();

                let salt = parseInt(Moment(date, sourceFormat).format("DD")) / 2;


                let statistic = {
                    byDay: {
                        date: day,
                        data: [
                            {hour: 1, stock: 200 * (salt), prediction: 200 * (salt)},
                            {hour: 2, stock: 300 * (salt), prediction: 300 * (salt)},
                            {hour: 3, stock: 300 * (salt), prediction: 300 * (salt)},
                            {hour: 4, stock: 300 * (salt), prediction: 300 * (salt)},
                            {hour: 5, stock: 300 * (salt), prediction: 300 * (salt)},
                            {hour: 6, stock: 200 * (salt), prediction: 300 * (salt)},
                            {hour: 7, stock: 200 * (salt), prediction: 300 * (salt)},
                            {hour: 8, stock: 200 * (salt), prediction: 300 * (salt)},
                            {hour: 9, stock: 200 * (salt), prediction: 300 * (salt)},
                            {hour: 10, stock: 200 * (salt), prediction: 220 * (salt)},
                            {hour: 11, stock: 230 * (salt), prediction: 220 * (salt)},
                            {hour: 12, stock: 200 * (salt), prediction: 220 * (salt)},
                            {hour: 13, stock: 115 * (salt), prediction: 220 * (salt)},
                            {hour: 14, stock: 70 * (salt), prediction: 210 * (salt)},
                            {hour: 15, stock: 100 * (salt), prediction: 210 * (salt)},
                            {hour: 16, stock: 70 * (salt), prediction: 210 * (salt)},
                            {hour: 17, stock: 100 * (salt), prediction: 210 * (salt)},
                            {hour: 18, stock: 70 * (salt), prediction: 210 * (salt)},
                            {hour: 19, stock: 100 * (salt), prediction: 200 * (salt)},
                            {hour: 20, stock: 70 * (salt), prediction: 200 * (salt)},
                            {hour: 21, stock: 100 * (salt), prediction: 200 * (salt)},
                            {hour: 22, stock: 70 * (salt), prediction: 200 * (salt)},
                            {hour: 23, stock: 100 * (salt), prediction: 200 * (salt)},
                            {hour: 24, stock: 70 * (salt), prediction: 200 * (salt)},
                        ]
                    },
                    byWeek: {
                        date: startOfWeek,
                        data: [
                            {date: startOfWeek, stock: 100 * (salt), prediction: 200 * (salt)},
                            {
                                date: (dayStartOfWeekOnly + 1) + "/" + monthOnly,
                                stock: 70 * (salt),
                                prediction: 300 * (salt)
                            },
                            {
                                date: (dayStartOfWeekOnly + 2) + "/" + monthOnly,
                                stock: 102 * (salt),
                                prediction: 300 * (salt)
                            },
                            {
                                date: (dayStartOfWeekOnly + 3) + "/" + monthOnly,
                                stock: 105 * (salt),
                                prediction: 300 * (salt)
                            },
                            {
                                date: (dayStartOfWeekOnly + 4) + "/" + monthOnly,
                                stock: 200 * (salt),
                                prediction: 300 * (salt)
                            },
                            {
                                date: (dayStartOfWeekOnly + 5) + "/" + monthOnly,
                                stock: 200 * (salt),
                                prediction: 300 * (salt)
                            },
                            {
                                date: (dayStartOfWeekOnly + 6) + "/" + monthOnly,
                                stock: 200 * (salt),
                                prediction: 300 * (salt)
                            }
                        ]
                    },
                    byMonth: {
                        date: startOfMonth,
                        data: [
                            {date: "01/" + monthOnly, stock: 100 * (salt), prediction: 200 * (salt)},
                            {date: "02/" + monthOnly, stock: 70 * (salt), prediction: 300 * (salt)},
                            {date: "03/" + monthOnly, stock: 102 * (salt), prediction: 300 * (salt)},
                            {date: "04/" + monthOnly, stock: 105 * (salt), prediction: 300 * (salt)},
                            {date: "05/" + monthOnly, stock: 200 * (salt), prediction: 300 * (salt)},
                            {date: "06/" + monthOnly, stock: 200 * (salt), prediction: 300 * (salt)},
                            {date: "07/" + monthOnly, stock: 200 * (salt), prediction: 300 * (salt)},
                            {date: "08/" + monthOnly, stock: 200, prediction: 300},
                            {date: "09/" + monthOnly, stock: 200, prediction: 300},
                            {date: "10/" + monthOnly, stock: 200, prediction: 220},
                            {date: "11/" + monthOnly, stock: 200 * (salt), prediction: 220 * (salt)},
                            {date: "12/" + monthOnly, stock: 200, prediction: 220},
                            {date: "13/" + monthOnly, stock: 100, prediction: 220},
                            {date: "14/" + monthOnly, stock: 70, prediction: 210},
                            {date: "15/" + monthOnly, stock: 100, prediction: 210},
                            {date: "16/" + monthOnly, stock: 70, prediction: 210},
                            {date: "17/" + monthOnly, stock: 100, prediction: 210},
                            {date: "18/" + monthOnly, stock: 70, prediction: 210},
                            {date: "19/" + monthOnly, stock: 100, prediction: 200},
                            {date: "20/" + monthOnly, stock: 70, prediction: 200},
                            {date: "21/" + monthOnly, stock: 100, prediction: 200},
                            {date: "22/" + monthOnly, stock: 70, prediction: 200},
                            {date: "23/" + monthOnly, stock: 100, prediction: 200},
                            {date: "24/" + monthOnly, stock: 70, prediction: 200},
                            {date: "25/" + monthOnly, stock: 100, prediction: 210},
                            {date: "26/" + monthOnly, stock: 70, prediction: 210},
                            {date: "27/" + monthOnly, stock: 100, prediction: 200},
                            {date: "28/" + monthOnly, stock: 70, prediction: 200},
                            {date: "29/" + monthOnly, stock: 100, prediction: 200},
                            {date: "30/" + monthOnly, stock: 70, prediction: 200},
                            {date: "31/" + monthOnly, stock: 140, prediction: 140},
                        ]
                    }
                };


                statistic.byMonth.data = statistic.byMonth.data.slice(0, daysInMonth);

                resolve(statistic);
            }catch (e) {
                console.error(e);
                reject({})
            }


        } )


    }


    static doGetNotifications(){

    }

    static doGetProductRequests(){


        return new Promise((resolve, reject) => {
            resolve([
                {
                    id : "5ced4c28a24a36001778403c",
                    stationId : "5cec1a164bda4429340dfdbe",
                    name : "Request for some product",
                    badge : "Razvan98",
                    description : "We want Snacks and Whisky"
                },
                {
                    id : "5ced52aaa24a36001778403d",
                    stationId : "5cec1a164bda4429340dfdbe",
                    name : "Give me",
                    badge : "Razvan98",
                    description : "We want Snacks and Whisky"
                }
            ])
        })




    }

    static doGetUniverse(){
        /**
         * The scope will be bound to App.js
         */
        let scope = this;


        console.log("Updating universe...");
        if(!scope.state.isSafeToUpdateUniverse){
            console.log("Universe not safe to update.");
            return new Promise((resolve)=>{resolve();});
        }

        return new Promise( (resolve, reject) => {

            axios
                .get(Config.API_GLOBAL_RETRIEVE + Config.LOCATION_ID)
                .then(response => {
                    console.log(response);
                    try {
                        let status = response["status"];
                        if (parseInt(status) === Config.HTTP_REQUEST_STATUS_OK) {
                            let data = response["data"];

                            if(scope.state.initial !== undefined && scope.state.initial !== null){
                                if(JSON.stringify(scope.state.initial) ===  JSON.stringify(data)){
                                    console.log("Universe was already up to date.");
                                    resolve();
                                    return;
                                }
                            }


                            resolve();


                        }
                    } catch (e) {
                        console.error("Parsing error at load.");
                        console.error(e);
                        reject();
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject();
                })
                .finally(() => {
                    // always executed
                });
        });


    }



}
export default Networking;