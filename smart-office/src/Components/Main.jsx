import React, { Component } from "react";
import Item from "./Item";
import "../resources/styles/main.css";

class Main extends Component {
  render() {
    let chestie = [];
    let localChosen = this.props.chosen;

    let chestie2 = [];

    if (localChosen !== null) {
      if (localChosen.type !== "item") chestie2 = localChosen.elements;
      else
        chestie2 = this.getParent(localChosen.ID, this.props.elements).elements;

      while (localChosen.parentID !== null) {
        chestie.push(localChosen);
        localChosen = this.getParent(localChosen.ID, this.props.elements);
        if (localChosen === null) break;
      }
      chestie.push(localChosen);
    } else if (localChosen == null) {
      chestie2 = this.props.elements;
    }

    return (
      <div className="MainContainer">
        <div className="breadcrumbs">
          <p>
            All items
            {chestie.reverse().map(element => {
              return (
                <div>
                  <i className="material-icons">arrow_right</i>
                  <p>{element.name}</p>
                </div>
              );
            })}
          </p>
        </div>

        <div className="Main">
          {chestie2.map(element => {
            return (
              <Item
                click={this.props.onItemClick}
                key={element.ID}
                item={element}
              />
            );
          })}
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
