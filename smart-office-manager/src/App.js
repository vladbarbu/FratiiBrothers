import React from 'react';
import logo from './logo.svg';
import './resources/styles/App.scss';

import NavBar from './Components/NavBar'
import SideMenu from './Components/SideMenu'
import Main from './Components/Main'
import SideBar from './Components/SideBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="App-container">
        <SideMenu/>
        <Main/>
        <SideBar/>
      </div>
    </div>
  );
}

export default App;
