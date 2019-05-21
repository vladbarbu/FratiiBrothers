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



}
export default Networking;