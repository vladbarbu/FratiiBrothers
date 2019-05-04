import React, { Component } from "react";
import "../resources/styles/FewLeftPopup.scss";

class FewLeftPopup extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
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
      this.props.togglePopup();
    }
  }
  state = {
    input: ""
  };

  backSpace = () => {
    this.setState({
      input: this.state.input.slice(0, -1)
    });
  };

  onClick = button => {
    this.setState({
      input: this.state.input + button
    });
  };

  render() {
    return (
      <div className="FewLeftPopup">
        <div className="inner">
          <div className="card" ref={this.setWrapperRef}>
            <div className="container">
              <div className="header">
                <h2>Insert the number of items left</h2>
                <div
                  className="button return"
                  onClick={() => this.props.togglePopup()}
                >
                  Return to dashboard
                </div>
              </div>

              <div className="display">
                {/* <label htmlFor="fewLeft">Insert the number of items left</label>
            <input id="itemsLeft" type="text" placeholder="Number of items">
              {this.state.input}
            </input> */}
                <p>{this.state.input}</p>
              </div>

              <div className="keyboard">
                <button name="1" onClick={e => this.onClick(e.target.name)}>
                  1
                </button>
                <button name="2" onClick={e => this.onClick(e.target.name)}>
                  2
                </button>
                <button name="3" onClick={e => this.onClick(e.target.name)}>
                  3
                </button>

                <button name="4" onClick={e => this.onClick(e.target.name)}>
                  4
                </button>
                <button name="5" onClick={e => this.onClick(e.target.name)}>
                  5
                </button>
                <button name="6" onClick={e => this.onClick(e.target.name)}>
                  6
                </button>

                <button name="7" onClick={e => this.onClick(e.target.name)}>
                  7
                </button>
                <button name="8" onClick={e => this.onClick(e.target.name)}>
                  8
                </button>
                <button name="9" onClick={e => this.onClick(e.target.name)}>
                  9
                </button>

                <button name="0" onClick={e => this.onClick(e.target.name)}>
                  0
                </button>
                <button name="backspace" onClick={() => this.backSpace()}>
                  backspace
                </button>
              </div>

              <div className="footer">
                <div
                  className="button submit"
                  onClick={() => this.props.onConfirm(this.state.input)}
                >
                  <div className="content">
                    <p>Confirm</p>
                  </div>
                </div>
                <div
                  className="button cancel"
                  onClick={() => this.props.togglePopup()}
                >
                  <div className="content">
                    <p>Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FewLeftPopup;
