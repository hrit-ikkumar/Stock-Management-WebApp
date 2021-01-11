import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Header from './components/HeaderComponent';
import Items from './components/ItemsComponent';
import {ITEMS} from './shared/items';

// Class Component
class App extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      items: ITEMS
    };
  }

  render() {
    return(
      <div>
        <Header />
        <Items items = {this.state.items}/>
      </div>
    );
  }
}

export default App;
