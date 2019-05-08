import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";

class Main extends Component{

  constructor(props) {
    super(props);
  }

  render() {

    switch(this.props.sideBarChosen) {
      case 'Notifications':
        return (<div>

        </div>);
      case 'Stations':
        return (<div>
          <SideBar />
        </div>);
      case 'Item Stock':
        return (<div>
        
        </div>);
      case 'Product Requests':
        return (<div>
        
        </div>);
      case 'Supply Statistics':
        return (<div>
        <SideBar_Statistics/>
        </div>);
      default:
        return (<div>

        </div>);
    }
  }
}

export default Main;