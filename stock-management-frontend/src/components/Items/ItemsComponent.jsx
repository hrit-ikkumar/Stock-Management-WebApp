import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete';
import './index.css';
import Info from '@material-ui/icons/Info';
import { Checkbox } from '@material-ui/core';
class Items extends Component{

    /* Constructor to get values from App.js */
    constructor(props)
    {
        super(props);
        
        // It's own state
        this.state = {
            selectedItem: null
        };
        console.log("constructor called!");
        //this.onSelectedItem = this.onSelectedItem.bind(this) // binding in class constructor
        // above approach is better because binding will be done once
    }

    /*
        Why I am not using function keyword because
        class component has methods not the functions
        they are binded together with state.
        So, we don't need to use function keyword here.
        if we are using functional component then we can 
        use the function keyword to define the functions 
        inside the functional component.
    */

    /* onSelectedItem function for keeping track of selected item in given items */
    onSelectedItem(item){
        // setState is async function if you want to run the code in sync way you can pass callback function
        this.setState({selectedItem: item},
            () => console.log(this.state.selectedItem));
        /*
        this.setState((prevState, props) => ({
            selectedItem: prevState.selectedItem
        }))
        */
        console.log(this.state.selectedItem);
    }
    /*
    arrow function way
    onSelected = (item) => {

    }
    */

    componentDidMount(){
        console.log("componentDidMount called!");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate called!");
    }
    componentWillMount(){
        console.log("ComponentWillMount called")
    }

    render(){
        // Destructuring of props & states
        // means exposing the attributes inside properties
        // const {itemName, itemDetail} = this.props // in case of class component
        // const {itemName, itemDetail} = props // in case of functional component
        // const {state1, state2} = this.state // only case of class component

        console.log("render called!");
        // items element for every item & map for iterating each element in the array of js objects
        const items = this.props.items.map((item) =>{
            return(
                <div className="items">
                {/* if we don't use arrow function then we have to use
                    something like:
                    onClick={this.onSelectedItem} // and for binding this.onSelectedItem.bind(this)
                    onClick={() => this.onSelectedItem()} */}
                    <div outline key={item.id}
                        onClick={() => this.onSelectedItem(item.id)}>
                        <Checkbox disabled>
                            Item
                        </Checkbox>
                        <ButtonGroup
                            variant="contained">
                            <Button
                                startIcon={<SaveIcon />}
                                color="primary">
                                Edit
                            </Button>
                            <Button
                                startIcon={<Info />}
                                color="secondary">
                                View
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                color="yellow">
                                Delete
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            );
        });

        return(
            <div className="itemContainer">
                {items}
            </div>
        );
    }
}

export default Items;