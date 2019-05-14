import React, { Component } from "react";
import "../resources/styles/FewLeftPopup.scss";

class FewLeftPopup extends Component {

  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    input: "",
    valid : false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopup();
    }
  }

  backSpace = () => {
    this.setState({
      input: this.state.input.slice(0, -1)
    });
    this.updateValid();
  };
  clear = () => {
    this.setState({
      input: ""
    });
    this.updateValid();
  };

  onClick = button => {
    this.setState({
      input: this.state.input + button
    });
    this.updateValid();
  };

  updateValid = () => {
    this.setState((state,props) => ({
      valid : (state.input !== null && state.input !== "")
    }));
  };

  createKeys(){
    let keys = [];
    keys.push(this.createKey(7));
    keys.push(this.createKey(8));
    keys.push(this.createKey(9));
    keys.push(this.createKey(4));
    keys.push(this.createKey(5));
    keys.push(this.createKey(6));
    keys.push(this.createKey(1));
    keys.push(this.createKey(2));
    keys.push(this.createKey(3));
    keys.push(this.createKey(0));
    keys.push( <div key="backspace" className="red" ><i onClick={() => this.backSpace()} className="material-icons">backspace</i></div>);
    keys.push( <div key="clear" className="red"><span onClick={() => this.clear()}>C</span></div>);
    return keys;
  }

  createKey(digit){
   return <div key={digit} > <span onClick={ () => this.onClick(digit)}>{digit}</span> </div>;
  }

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
                  Return
                </div>
              </div>

              <div className="display">
                <p>{this.state.input}</p>
              </div>

              <div className="keyboard">
                {this.createKeys()}


              </div>

              <div className="footer">
                <div
                  className="button submit" data-active={this.state.valid}
                  onClick={() => {this.props.onConfirm(this.state.input)}}
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
