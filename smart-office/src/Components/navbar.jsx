import React, { Component } from "react";
import "../resources/styles/nav.css";
import Logo from "./../resources/images/logo.svg";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar">
        <div className="logo">
          <img alt="Logo" src={Logo} />
        </div>

        <div className="body">
          <button className="button notifications">
            <i className="material-icons-two-tone"> notifications</i>
          </button>
          <div className="searchBar">
            <input
              placeholder="Search for a specific item"
              list="search-list"
            />
            <datalist id="search-list">
              {this.props.elements.map(element =>
                element.elements.map(element =>
                  element.elements.map(element => (
                    <option>{element.name}</option>
                  ))
                )
              )}
            </datalist>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
