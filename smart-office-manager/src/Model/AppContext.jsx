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

    getToggleSideBarStatistics : () => {},



});
export default AppContext;