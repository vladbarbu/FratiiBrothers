import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    if (this.props.counter.value === 0) {
      classes += "warning";
    } else {
      classes += "primary";
    }
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    if (count === 0) {
      return "Zero";
    } else {
      return count;
    }
  }
}

export default Counter;
