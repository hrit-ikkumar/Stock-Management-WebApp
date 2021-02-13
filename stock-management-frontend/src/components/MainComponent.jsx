import React, {Component} from 'react';
import Header from './Header/HeaderComponent';
import Footer from './Footer/FooterComponent';
import Items from './Items/ItemsComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchItem, postItem, incrementCurrentStock, decrementCurrentStock, deleteItem, editItem} from '../redux/actions/ActionCreators';


const mapStateToProps = state => {
  return {
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchItem: () => {dispatch(fetchItem())},
  postItem: (itemName, dateAdded, currentStock, manufacturingCompany) => dispatch(postItem(itemName, dateAdded, currentStock, manufacturingCompany)),
  incrementCurrentStock: (id) => dispatch(incrementCurrentStock(id)),
  decrementCurrentStock: (id) => dispatch(decrementCurrentStock(id)),
  deleteItem: (id) => dispatch(deleteItem(id)),
  editItem: (item) => dispatch(editItem(item))
})

// Class Component
class Main extends Component{

  componentDidMount() {
    this.props.fetchItem(); // fetch all the items;
  }

  render() {
    return(
      <div>
        <Header />    
          <Switch>
            <Route path="/home"
              component={() => <Items items = {this.props.items} 
                postItem = {this.props.postItem}
                incrementCurrentStock={this.props.incrementCurrentStock}
                decrementCurrentStock={this.props.decrementCurrentStock} 
                deleteItem={this.props.deleteItem}
                editItem={this.props.editItem}
              />} 
            />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
