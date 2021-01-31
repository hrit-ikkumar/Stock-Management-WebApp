import React, {Component} from 'react';
import {Card, CardBody, 
    CardTitle, Button, ButtonGroup } from 'reactstrap';

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
                <div className="col-11 col-md-5 m-2">
                {/* if we don't use arrow function then we have to use
                    something like:
                    onClick={this.onSelectedItem} // and for binding this.onSelectedItem.bind(this)
                    onClick={() => this.onSelectedItem()} */}
                    <Card outline key={item.id}
                        
                        onClick={() => this.onSelectedItem(item.id)}>

                        {/* Card title name */}
                        <CardTitle>{item.itemName}</CardTitle>

                        {/* Card Body Part */}
                        <CardBody>
                            <ul>
                                <li>Date: {item.dateOnAdded}</li>
                                <li>Stock: {item.currentStock}</li>
                                <li>Company: {item.manufacturingCompany}</li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            );
        });

        return(
            <div>
                <div className="container mt-5">
                    {/* Create Item Button */}
                    <div className="row">
                        <ButtonGroup>
                            <Button outline color="success">
                                <h4>
                                    <img src="https://img.icons8.com/bubbles/60/000000/create-new.png" 
                                    alt="Create Item"/>
                                </h4>
                            </Button>
                        </ButtonGroup>
                    </div>

                    {/* Previously created items are here */}
                    <div className="row mt-3">
                        {items}
                    </div>
                </div>
            </div>

        );
    }
}

export default Items;