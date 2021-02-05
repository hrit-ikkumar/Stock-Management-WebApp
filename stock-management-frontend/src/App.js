import './App.css';
import React, {Component} from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
// Class Component
class App extends Component{
  // presentational component only
  render() {
    return(
      <div className="app">
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
