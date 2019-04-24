import React, { Component } from "react";
import "../resources/styles/nav.css";
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
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
    console.log(node);
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log("You clicked outside of me!");
      //this.state.inputValue = "";
      this.props.discardSearch();
    }
    if (this.wrapperRef && this.wrapperRef.contains(event.target))
      console.log("You clicked inside of me ;) !" + this.pressed);
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
          {this.props.element !== null ? ( //Daca nu e pe pagina principala apare
            <button
              className="button goBack"
              onClick={() => {
                //console.log(this.props.element.ID);
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
              onChange={evt => this.updateInputValue(evt)} //Apelam pentru a salva inputul din search bar
            />

            {this.props.navBarClick ? ( // Verificam daca a fost apasat searchBarul
              <div
                id="search-list"
                {...(this.props.element ? (style = { style }) : null)} // Verificam daca avem buton de GoBack
                ref={this.setWrapperRef}
              >
                {this.props.elements.map((
                  element // Parcurgem Item-ele
                ) =>
                  element.elements.map(element =>
                    element.elements.map(element =>
                      this.searchInName(element.name) ? ( //Verificam daca string-ul din input se regaseste in numele item-elor
                        ID < 6 ? ( //Limitam lista la 6 iteme
                          <button
                            key={++ID}
                            className="searchItem"
                            onClick={() => {
                              this.onClickOption(element);
                              this.props.discardSearch();
                            }}
                          >
                            <img
                              src={require("./../resources/" + element.image)}
                            />
                            <span>{" " + element.name}</span>
                          </button>
                        ) : null
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
