import React, { Component } from "react";
import Item from "./Item";
import "../resources/styles/main.css";

class Main extends Component {
  render() {
    return (
      <div className="MainContainer">
        <div className="breadcrumbs">
          <p>
            All items
            <i className="material-icons">arrow_right</i>
          </p>
        </div>

        <div className="Main">
          {this.props.elements.map(element => {
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
}

export default Main;
