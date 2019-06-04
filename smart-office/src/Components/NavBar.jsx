import React, { Component } from "react";
import "../resources/styles/Nav.scss";
import Logo from "./../resources/images/logo.svg";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.pressed = 0;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      inputValue: ""
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // console.log("You clicked outside of me!");
      this.props.discardSearch();
    }
    // if (this.wrapperRef && this.wrapperRef.contains(event.target))
    //   console.log("You clicked inside of me ;) !" + this.pressed);
  }

  onClickGoBack = ID => {
    this.props.onClickGoBack(
      this.getParent(this.props.element.ID, this.props.elements)
    );
  };

  onClickOption = ID => {
    this.props.onClickOption(ID.ID);
  };

  updateInputValue(evt) {
    //console.log(evt.target.value);
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    let style = { right: "238px" };

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
                this.onClickGoBack(
                  this.getParent(this.props.element.ID, this.props.elements)
                );
              }}
            >
              <i className="material-icons"> arrow_back</i>
            </button>
          ) : null}
          <button
            className="button notifications"
            onClick={() => this.props.onToggleNotificationPopup()}
          >
            <i className="material-icons"> notifications</i>
          </button>
          <div className="searchBar">
            <input
              placeholder="Search for a specific item"
              onClick={() => this.props.onClickNavBar()}
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)} //Apelam pentru a salva inputul din search bar
            />
            <i className="material-icons search-icon">search</i>
            {this.props.navBarClick ? ( // Verificam daca a fost apasat searchBarul
              <div
                id="search-list"
                {...(this.props.element ? (style = { style }) : null)} // Verificam daca avem buton de GoBack
                ref={this.setWrapperRef}
              >
                {this.searchBarItems(this.props.elements, 0)}
              </div>
            ) : null}
          </div>
          <button
            onClick={() => {
              this.props.onToggleMobileDrawer();
            }}
            className="button menu"
          >
            <i className="material-icons">menu</i>
          </button>
        </div>
      </nav>
    );
  }

  searchBarItems(element, flag) {
    let ID = 0;
    if (flag === 0) return element.map(element => this.searchBarItems(element, 1));
    else {
      //console.log(element);
      return element.elements.map(element =>
        element.type === "item" ? (
          this.searchInName(element.name) ? ( //Verificam daca string-ul din input se regaseste in numele item-elor
            ID < 6 ? ( //Limitam lista la 6 iteme
              <div
                key={++ID}
                className="searchItem"
                onClick={() => {
                  this.onClickOption(element);
                  this.props.discardSearch();
                }}
              >
                <img
                  alt="Item"
                  src={element.image}
                />
                <p>{" " + element.name}</p>
                <div className="btn">
                  <i className="material-icons">play_arrow</i>
                </div>
              </div>
            ) : null
          ) : null
        ) : (
          this.searchBarItems(element, 1)
        )
      );
    }
  }

  resetValue = () => {
    this.setState({ inputValue: "" });
  };

  searchInName = name => {
    name = name.toLowerCase();
    if (name.indexOf(this.state.inputValue.toLowerCase()) !== -1) return true;
    return false;
  };

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

export default NavBar;
