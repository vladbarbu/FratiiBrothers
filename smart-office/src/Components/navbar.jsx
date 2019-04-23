import React, { Component } from "react";
import "../resources/styles/nav.css";
import Logo from "./../resources/images/logo.svg";

class NavBar extends Component {
  render() {
    let style = { right: "258px" };
    return (
      <nav className="NavBar">
        <div className="logo">
          <img alt="Logo" src={Logo} />
        </div>

        <div className="body">
          {this.props.element.parentID ? (
            <button className="button goBack">
              <i className="material-icons-two-tone"> arrow_back</i>
            </button>
          ) : null}
          <button className="button notifications">
            <i className="material-icons-two-tone"> notifications</i>
          </button>
          <div className="searchBar">
            <input
              placeholder="Search for a specific item"
              onClick={() => this.props.onClickNavBar()}
            />
            {this.props.navBarClick ? (
              <ul
                id="search-list"
                {...(this.props.element.parentID ? (style = { style }) : null)}
              >
                {this.props.elements.map(element =>
                  element.elements.map(element =>
                    element.elements.map(element => (
                      <li>
                        <button>{element.name}</button>
                      </li>
                    ))
                  )
                )}
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
