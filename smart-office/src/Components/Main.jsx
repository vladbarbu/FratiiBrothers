import React, { Component } from "react";
import Item from "./Item";
import "../resources/styles/Main.scss";
import Config from "../config";

class Main extends Component {
  render() {
    let breadcrumbs = [];
    let localChosen = this.props.chosen;

    let localElementsContainer = [];

    if (localChosen !== null && localChosen !== undefined) {

      if (localChosen.type !== "item") localElementsContainer = localChosen.elements;
      else localElementsContainer = this.getParent(localChosen.ID, this.props.elements).elements;

      while (localChosen.parentID !== null) {
        breadcrumbs.push(localChosen);
        localChosen = this.getParent(localChosen.ID, this.props.elements);
        if (localChosen === null) break;
      }

      if(localChosen) breadcrumbs.push(localChosen);

    } else if (localChosen == null) {
      localElementsContainer = this.props.elements;
    }


    return (
      <div className="MainContainer">
        <div className="breadcrumbs">
          <p
            onClick={() => {
              this.props.onItemClick(null);
            }}
          >
            {" "}
            All items{" "}
          </p>
          {breadcrumbs.reverse().map((element, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  this.props.onItemClick(element.ID);
                }}
              >
                <i className="material-icons">arrow_right</i>
                <p>{element.name}</p>
              </div>
            );
          })}
        </div>

        <div className="Main">
          { !Config.isEmpty(localElementsContainer)
            ? localElementsContainer.map(element => {
                return (
                  <Item
                    click={this.props.onItemClick}
                    key={element.ID}
                    item={element}
                  />
                );
              })
              : <div className={"Item empty"}><p>0</p><span>Items</span></div>}
        </div>
      </div>
    );
  }

  getParent = (ID, V) => {
    let found = null;
    if (ID.parentID !== null) {
      for (let j = 0; j < V.length; j++) {
        for (let i = 0; i < V[j].elements.length; i++) {
          if (ID === V[j].elements[i].ID) {
            return V[j];
          }
        }
        if (V[j].type !== "item") {
          found = this.getParent(ID, V[j].elements);
          if (found !== null) break;
        }
      }
    }
    return found;
  };
}

export default Main;
