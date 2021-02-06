import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import './index.css'; // custom css
import Info from '@material-ui/icons/Info';
import {Card, CardActions, CardContent, CardHeader, Container, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { ITEMS } from '../../shared/items';


class Items extends Component{

    /* Constructor to get values from App.js */
    constructor(props)
    {
        super(props);
        
        // It's own state
        this.state = {
            selectedItem: null,
            isLoading: true,
            items: null
        };
        console.log(this.props.item);
        console.log("constructor called!");
        //this.onSelectedItem = this.onSelectedItem.bind(this) // binding in class constructor
        // above approach is better because binding will be done once
    }

    /* onSelectedItem function for keeping track of selected item in given items */
    onSelectedItem(item){
        // setState is async function if you want to run the code in sync way you can pass callback function
        this.setState({selectedItem: item},
            () => console.log(this.state.selectedItem));

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
    componentDidUpdate (){
        console.log("componentDidUpdate called!");
    }
    async componentWillMount(){
        console.log("Component Will Mount");
        const url = "http://localhost:3001/itemRouter";
        const response = await fetch(url);
        const data = await response.json(); 
        console.log("ComponentWillMount")
        console.log(data);
        console.log( data[0].dateAdded);
        this.setState({items:data, isLoading:false});
        this.setState({isLoading:false});
    }

    render(){
        //const classes = userStyles();
        console.log("render called!");
        console.log(this.state.items);
        const createItem = 
                    <Button
                        outline
                        fullWidth="true"
                        startIcon={<AddIcon />}
                        size="large"
                        orientation="horizontal"
                        style={{fontSize:24, border:'solid', borderColor:'orange', padding:'2px'}}
                        color="secondary">Create Item</Button>;

        // items element for every item & map for iterating each element in the array of js objects
        const items = this.state.isLoading!==true ?  this.state.items.map((item) =>{
            console.log(item);
            return(
                <div className="item">
                    <Card
                        style={{
                            display:'block',
                            color:'#2B6705',    
                            transitionDuration:'0.3s',
                        }}
                        outline variant="outlined" key={item.id}
                        onClick={() => this.onSelectedItem(item.id)}
                        >
                        <CardHeader
                            title={`${item.itemName}`}
                            subheader={`Manufacturer: ${item.manufacturingCompany}`}
                        />
                        <CardContent>
                            <Typography>{`Current Stocks: ${item.currentStock}`}</Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup
                                orientation="horizontal"
                                fullWidth="true"
                                size="large">
                                <Button
                                    startIcon={<SaveIcon />}
                                    color="primary">
                                    Edit
                                </Button>
                                <Button
                                    startIcon={<Info />}
                                    color="success">
                                    View
                                </Button>
                                <Button
                                    startIcon={<DeleteIcon />}
                                    color="secondary">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>
            
                </div>
            );
        }): <div>Loading...</div>;

        return(
            <Box paddingTop={10}>
                <Container maxWidth="lg">
                    <div>
                        {createItem}
                    </div>
                    <div>
                        {items}
                    </div>
                </Container>
            </Box>
            
        );
    }
}

export default Items;