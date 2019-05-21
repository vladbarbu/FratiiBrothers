class Networking {
    /**
     *
     * @param stationID
     * @param itemID
     * @param quantity
     * @param expirationDate
     *
     * @return {Promise}
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
     */
    static doClearWarning(stationID,itemID,warningID){

    }



}
export default Networking;