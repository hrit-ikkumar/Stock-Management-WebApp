import React, {Component} from 'react';
import Header from './Header/HeaderComponent';
import Footer from './Footer/FooterComponent';
import Items from './Items/ItemsComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchItem, postItem} from '../redux/actions/ActionCreators';


const mapStateToProps = state => {
  return {
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchItem: () => {dispatch(fetchItem())},
  postItem: (itemName, dateAdded, currentStock, manufacturingComapany) => dispatch(postItem(itemName, dateAdded, currentStock, manufacturingComapany))
})

// Class Component
class Main extends Component{

  componentDidMount() {
    this.props.fetchItem(); // fetch all the items;
  }

  render() {
    console.log(this.props.Items);
    return(
      <div>
        <Header />    
          <Switch>
            <Route path="/home" component={() => <Items items = {this.props.items} postItem = {this.props.postItem} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
