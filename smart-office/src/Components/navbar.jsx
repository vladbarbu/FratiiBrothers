import React, { Component } from "react";
import "../resources/styles/nav.css";
import Logo from "./../resources/images/logo.svg";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  onClickGoBack = ID => {
    this.props.onClickGoBack(
      this.getParent(this.props.element.ID, this.props.elements)
    );
  };

  updateInputValue(evt) {
    console.log(evt.target.value);
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    let ID = 0;
    let style = { right: "238px" };
    const styleSearch = {
      position: "relative",
      bottom: "50px"
    };
    return (
      <nav className="NavBar">
        <div className="logo">
          <img alt="Logo" src={Logo} />
        </div>

        <div className="body">
          {this.props.element !== null ? (
            <button
              className="button goBack"
              onClick={() => {
                console.log(this.props.element.ID);
                this.onClickGoBack(
                  this.getParent(this.props.element.ID, this.props.elements)
                );
              }}
            >
              <i className="material-icons"> arrow_back</i>
            </button>
          ) : null}
          <button className="button notifications">
            <i className="material-icons"> notifications</i>
          </button>
          <div className="searchBar">
            <input
              placeholder="Search for a specific item"
              onClick={() => this.props.onClickNavBar()}
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
            />

            {this.props.navBarClick ? (
              <div
                id="search-list"
                {...(this.props.element ? (style = { style }) : null)}
              >
                {this.props.elements.map(element =>
                  element.elements.map(element =>
                    element.elements.map(element =>
                      element.name.indexOf(this.state.inputValue) > -1 ? (
                        <div key={++ID} className="searchItem">
                          <img
                            src={require("./../resources/" + element.image)}
                          />{" "}
                          <span>{+" " + element.name}</span>
                        </div>
                      ) : null
                    )
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
  getParent = (ID, V) => {
    if (ID.parentID !== null) {
      for (let j = 0; j < V.length; j++) {
        for (let i = 0; i < V[j].elements.length; i++) {
          if (ID === V[j].elements[i].ID) {
            return V[j];
          }
        }
        if (V[j].type !== "item") return this.getParent(ID, V[j].elements);
      }
    }
    return null;
  };
}

export default NavBar;
