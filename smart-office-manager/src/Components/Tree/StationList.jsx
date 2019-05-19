import React, {PureComponent} from "react";
import StationCard from "../Station/StationCard";
import AppContext from "../../Model/AppContext";
import Config from "../../config";

class StationList extends PureComponent{
    render() {
        let chosenElement = this.context.getChosenElement(Config.SCREEN_IDENTIFIER_STOCK);
        let chosenStation = this.context.getChosenStation(Config.SCREEN_IDENTIFIER_STOCK);

        return <div className={"StationList"}>
            {this.props.stations.map((element, index) => {
                    if(!Config.isEmpty(chosenElement) && !Config.isEmpty(element.elementsFlat) && element.elementsFlat.hasOwnProperty(chosenElement.ID))
                    return (
                        <StationCard
                            active = {!Config.isEmpty(chosenStation) && String(chosenStation.ID) === String(element.ID)}
                            key={index}
                            station={element}
                            onClickStation={this.context.doChooseStation}
                        />
                    );
                    else return null;
            })}
        </div>
    }
}
StationList.contextType = AppContext;
export default StationList;