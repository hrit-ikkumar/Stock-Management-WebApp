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
        // console.log("constructor called!");
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
        this.setState({selectedItem: item});
    }

    componentDidMount(){
        // console.log("componentDidMount called!");
    }
    componentDidUpdate(){
        // console.log("componentDidUpdate called!");
    }

    render(){
        // console.log("render called!");
        // items element for every item & map for iterating each element in the array of js objects
        const items = this.props.items.map((item) =>{
            return(
                <div className="col-11 col-md-5 m-2">
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