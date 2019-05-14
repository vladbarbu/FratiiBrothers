import React  from "react";


const AppContext = React.createContext({
    /**
     * Values declared here for variables *should* be redundant. Initialize them in the Context provider
     */
    station : {},
    doGetIsSafeToUpdateUniverse : (scope) => {},
    doChangeIsSafeToUpdateUniverse : (scope) => {},
    doUpdateUniverse : () => {},
    startLoading : (scope) => {},
    stopLoading : (scope) => {},
    doNotificationSend : (data) => {},

});
export default AppContext;