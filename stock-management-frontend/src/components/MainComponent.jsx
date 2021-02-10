import React, {Component} from 'react';
import Header from './Header/HeaderComponent';
import Footer from './Footer/FooterComponent';
import Items from './Items/ItemsComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchItem, addItem} from '../redux/actions/ActionCreators';


const mapStateToProps = state => {
  return {
    Items: state.Items,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchItem: () => {dispatch(fetchItem())},
  addItem: (item) => dispatch(addItem(item))
})


// Class Component
class Main extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchItem(); // fetch all the items;
  }


  render() {
    return(
      <div>
        <Header />    
          <Switch>
            <Route path="/home" component={() => <Items Items = {this.props.Items} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
