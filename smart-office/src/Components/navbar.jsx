import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const styleTitle = { color: "#0DD2A3" };
    const styleButton = { color: "#0DD2A3" };
    const styleBackButton = { background: "#DEDEDE" };
    const styleSearch = { width: "500px", height: "58px" };
    return (
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand font-weight-bold" style={styleTitle}>
          SmartOffice
        </a>

        <form className="form-inline">
          <button
            className="btn  my-2 my-sm-0 m-1 shadow-sm p-3 mb-5 rounded text-white"
            type="submit"
            style={styleBackButton}
          >
            <i className="fas fa-arrow-left fa-lg" />
          </button>
          <button
            className="btn  my-2 my-sm-0 m-4 shadow-sm p-3 mb-5 rounded"
            type="submit"
            style={styleButton}
          >
            <i className="far fa-bell fa-lg" />
          </button>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search for a specific item"
            aria-label="Search"
            style={styleSearch}
          />
        </form>
      </nav>
    );
  }
}

export default NavBar;
