import React, { Component } from "react";
import "../resources/styles/navBar.css";

class NavBar extends Component {
  render() {
    const styleBackButton = { background: "#DEDEDE" };
    const styleNotifButton = { fontSize: "40px" };
    return (
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a
          className="navbar-brand font-weight-bold"
          href="#"
          style={{ color: "#0DD2A3" }}
        >
          SmartOffice
        </a>

        <form className="form-inline">
          <button
            className="btn  my-2 my-sm-0 m-1 shadow-sm p-3 mb-5 rounded text-white"
            type="submit"
            style={styleBackButton}
          >
            <i className="material-icons">arrow_back</i>
          </button>
          <button
            className="btn  my-2 my-sm-0 m-4 shadow-sm p-3 mb-5 rounded bg-light"
            type="submit"
          >
            <i className="material-icons-two-tone" style={styleNotifButton}>
              notifications
            </i>
          </button>

          <select
            data-live-search="true"
            data-live-search-style="startsWith p-3"
            className="selectpicker"
            defaultValue="search"
          >
            <option value="search" disabled hidden>
              Search for a specific item
            </option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="Cups">Cups</option>
            <option value="Apple">Apple</option>
            <option value="Orange juice">Orange Juice</option>
            <option value="Orange juice">Orange Juice</option>
            <option value="Orange juice">Orange Juice</option>
            <option value="Orange juice">Orange Juice</option>
          </select>
        </form>
      </nav>
    );
  }
}

export default NavBar;
