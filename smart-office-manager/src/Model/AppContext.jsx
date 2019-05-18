import React  from "react";


const AppContext = React.createContext({
    /**
     * Values declared here for variables *should* be redundant. Initialize them in the Context provider
     */

    screen : 'Stations' ,

    /**
     * Changes the expand/collapse state of the element (Element.activeInStations)
     * Useful only for Category and Subcategory
     * @param {Element.ID} elementID
     * @param force
     */
    doTreeElementToggle : (elementID, force = null) =>{},


    /**
     * Set the Element.activeInStations attribute to true for the chosen element
     * Unset it for every other element
     * !Important!
     * Again, we are going to use the elementsFlat array from the station and rely on the REFERENCE-INSTEAD-OF-COPY property of JS Arrays
     * [Read the JSDoc in Station.elementsFlat]
     * @param {Element.ID} elementID
     */
    doChooseStationsElement : (elementID) => {}

});
export default AppContext;