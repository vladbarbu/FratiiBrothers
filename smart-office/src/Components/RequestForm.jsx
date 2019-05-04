import React, { Component } from "react";

class RequestForm extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {value: ''};

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  //   handleSubmit(event) {
  //     alert('A name was submitted: ' + this.state.value);
  //     event.preventDefault();
  //   }
  state = {
    name: "",
    description: "",
    employee: ""
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  handleEmployeeChange = e => {
    this.setState({ employee: e.target.value });
  };
  render() {
    return (
      <form
      // onSubmit={() =>
      //   this.props.handleSubmit(
      //     this.state.name,
      //     this.state.description,
      //     this.state.employee
      //   )
      // }
      // onSubmit={() => {
      //   try {
      //     console.log("Submit");
      //     console.log(
      //       this.state.name + this.state.description + this.state.description
      //     );
      //   } catch (e) {
      //     console.error(e);
      //   }
      // }}
      >
        <label>
          Name of the item
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <br />
        <label>
          Description of product and reason for request
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </label>
        <br />
        <label>
          Your name or badge ID
          <input
            type="text"
            value={this.state.employee}
            onChange={this.handleEmployeeChange}
          />
        </label>
        <button
          onClick={() => {
            this.props.onSubmit(
              this.state.name,
              this.state.description,
              this.state.employee
            );
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default RequestForm;
