import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Items from './ItemsComponent';
import {ITEMS} from '../shared/items';

// Class Component
class Main extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      items: ITEMS,
      selectedItem: null
    };
  }

  onItemSelect(item){
      this.setState({selectedItem: item});
  }

  render() {
    return(
      <div>
        <Header />
        <Items items = {this.state.items}
            onClick = {(item) => this.onItemSelect(item)}/>
        <Footer />
      </div>
    );
  }
}

export default Main;
