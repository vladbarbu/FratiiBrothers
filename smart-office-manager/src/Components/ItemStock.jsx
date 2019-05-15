import React, { Component } from "react";

class ItemStock extends Component {
  state = {
    itemTree: []
  };

  componentDidMount() {
    console.log(this.props.stations);
    for (let i = 0; i < this.props.stations.length; i++) {
      this.mergeStations(this.state.itemTree, this.props.stations[i].elements);
    }
    this.setState({ itemTree: this.state.itemTree });
  }

  render() {
    return <div>{this.itemStock(this.state.itemTree)}</div>;
  }

  itemStock(itemTree) {
    return (
      <div>
        {itemTree.map(element => {
          return (
            <div>
              <div onClick={() => this.changeActiveChild(element)}>
                <p>
                  {element._name}, {element._quantity}
                </p>
              </div>
              {element._childActive === true
                ? this.itemStock(element._elements)
                : null}
            </div>
          );
        })}
      </div>
    );
  }

  mergeStations(itemTree, toBeAdded) {
    for (let i = 0; i < toBeAdded.length; i++) {
      let found = false;
      for (let j = 0; j < itemTree.length; j++) {
        if (itemTree[j]._ID === toBeAdded[i].ID) {
          found = true;
          if (itemTree[j]._type === "item") {
            itemTree[j]._quantity =
              itemTree[j]._quantity + toBeAdded[i].quantity;
          } else
            this.mergeStations(itemTree[j]._elements, toBeAdded[i].elements);
          break;
        }
      }

      if (found === false) {
        let copy = JSON.parse(JSON.stringify(toBeAdded[i]));
        itemTree.push(copy);
      }
    }
  }

  changeActiveChild(element) {
    console.log("hey");
    if (element._childActive === true) element._childActive = false;
    else element._childActive = true;
    this.setState({ itemTree: this.state.itemTree });
  }
}

export default ItemStock;
