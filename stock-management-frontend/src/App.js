import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap'; // always put third party css before our main css
import './App.css';
import React, {Component} from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';

// Class Component
class App extends Component{
  render() {
    return(
      <div className="App">
        {/*<BrowserRouter>
            <div>
              <Main/>
            </div>
          </BrowserRouter> 
        */}
        {/* Reactstrap element Navbar for navigation bar in application */}
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Stock Management WebApp</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default App;
