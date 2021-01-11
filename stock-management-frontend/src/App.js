import './App.css';
import React, {Component} from 'react';
import Main from './components/MainComponent';

// Class Component
class App extends Component{
  // presentational component only
  render() {
    return(
      <div className="app">
        <Main/>
      </div>
    );
  }
}

export default App;
