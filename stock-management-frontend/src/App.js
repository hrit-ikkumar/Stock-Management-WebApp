import './App.css';
import React, {Component} from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {MainStore} from './redux/store/MainStore';

const store = MainStore();

// Class Component
class App extends Component{
  // presentational component only
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
