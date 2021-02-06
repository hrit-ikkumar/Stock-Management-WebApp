import React, {Component} from 'react';
import Header from './Header/HeaderComponent';
import Footer from './Footer/FooterComponent';
import Items from './Items/ItemsComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

// Class Component
class Main extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }



  render() {
    return(
      <div>
        <Header />    
          <Switch>
            <Route path="/home" component={() => <Items />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
