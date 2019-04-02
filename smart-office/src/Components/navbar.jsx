import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const styleTitle = {
      color: "#0DD2A3"
    };
    const styleButton = { color: "#0DD2A3" };
    const styleSearch = { width: "500px", height: "50px" };
    return (
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand font-weight-bold" style={styleTitle}>
          SmartOffice
        </a>

        <form className="form-inline">
          <button
            className="btn  my-2 my-sm-0 m-2 "
            type="submit"
            style={styleButton}
          >
            <i className="far fa-bell" />
          </button>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search for a specific item"
            aria-label="Search"
            width="20px"
            style={styleSearch}
          />
        </form>
      </nav>
    );
  }
}

export default NavBar;
