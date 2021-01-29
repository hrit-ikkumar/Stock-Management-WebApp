import React, {Component} from 'react';
import Header from './Header/HeaderComponent';
import Footer from './Footer/FooterComponent';
import Items from './Items/ItemsComponent';
import {ITEMS} from '../shared/items';
import {Switch, Route, Redirect} from 'react-router-dom';
import Greet from './Greet/Greet';

// Class Component
class Main extends Component{
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
        <Greet />     
          <Switch>
            {/*
              When I don't need to pass any props (arguments) to component
              <Route path="/home" component = {Component} 
            */}
            <Route path="/home" component={() => <Items items={this.state.items} />} />
            {/*
              When I want to use exact path like only this should be in our URL
              <Route exact path="/home" component = {Component} 
            */}
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
