import React  from "react";
import Config from "../config";


const AppContext = React.createContext({
    /**
     * Values declared here for variables *should* be redundant. Initialize them in the Context provider
     */

    stations : [],
    screen : Config.SCREEN_IDENTIFIER_STATIONS ,


    getChosenElement : (screen = Config.SCREEN_IDENTIFIER_STATIONS) => {},
    getChosenStation : (screen = Config.SCREEN_IDENTIFIER_STATIONS) => {},

    /**
     * Changes the expand/collapse state of the element (Element.activeInStations)
     * Useful only for Category and Subcategory
     * @param {Element.ID} elementID
     * @param force
     */
    doTreeElementToggle : (elementID, force = null) =>{},


    /**
     * Set the Element.activeInStations/activeInStock/activeInStatistics attribute to true for the chosen element
     * Unset it for every other element
     * !Important!
     * Again, we are going to use the elementsFlat array from the station and rely on the REFERENCE-INSTEAD-OF-COPY property of JS Arrays
     * [Read the JSDoc in Station.elementsFlat]
     * @param {Element.ID} elementID
     */
    doChooseElement : (elementID) => {},


    /**
     * Set the chosenStation mostly for the Item Stock page
     *
     * @param {Station} station
     * @param {Boolean} toggle = define if the "active" state can be toggled (e.g. in the item stock page)
     */

    doChooseStation : (station, toggle = true) => {},

    /**
     * Redirect to Supply Statistics Screen or update data for the same screen
     * @param station
     * @param element
     */
    doShowScreenSupplyStation : (station, element) => {},


    /**
     * Will show the Refill Stock modal. If the input data will be valid, it will
     * bind the scope and trigger the Networking.doRefillStock action (Promise)
     * Input Data: Quantity, Expiration Date
     * @param stationID
     * @param itemID
     */
    doActionElementRefillStock : (stationID, itemID) => {},


    /**
     * Will show the Edit Stock modal. There will be a global "update" button.
     * If data is valid, trigger the Networking.doEditStock action (Promise)
     * Input Data: Array<Quantity, Expiration Date>
     * @param stationID
     * @param itemID
     */
    doActionElementEditStock : (stationID, itemID) => {},


    /**
     * Will clear warnings for a specific item. Triggers the Networking.clearWarnings action (Promise)
     * @param stationID
     * @param itemID
     */
    doActionElementClearWarnings : (stationID, itemID) => {},


    /**
     * Will clear a specific notification/warning
     * @param stationID
     * @param itemID
     * @param warningID
     */
    doActionElementClearWarning : (stationID, itemID, warningID) => {},


    /**
     * -------
     *
     * PURE NETWORKING FUNCTIONS
     *
     * ------
     */

    /**
     *
     * @param stationID
     * @param itemID
     * @param quantity
     * @param expirationDate
     */
    doNetworkingRefillStock : (stationID, itemID, quantity, expirationDate) => {},

    /**
     *
     * @param stationID
     * @param itemID
     * @param stockCollection
     */
    doNetworkingEditStock : (stationID, itemID, stockCollection) => {},



    /**
     *
     * @param stationID
     * @param itemID
     * @param warningID
     */
    doNetworkingClearWarning : (stationID,itemID,warningID) => {},

    /**
     * Clears warnings
     * @param stationID
     * @param itemID
     */
    doNetworkingClearWarnings : (stationID, itemID) => {},


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

    doToggleMobileDrawer : (force = null) => {},
    doToggleSideBar : (force = null) => {},
    doToggleSideBarStatistics : (force = null) => {},
    getToggleSideBarStatistics : (force = null) => {},


    startLoading : (scope) => {},
    stopLoading : (scope) => {},

    showAlert : (scope) => {},
    hideAlert : (scope) => {},



});
export default AppContext;