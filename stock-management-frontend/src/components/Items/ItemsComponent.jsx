import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import './index.css'; // custom css
import Info from '@material-ui/icons/Info';
import {Card, CardActions, CardContent, CardHeader, Container, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


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
        //const classes = userStyles();
        console.log("render called!");
        // items element for every item & map for iterating each element in the array of js objects
        const items = this.props.items.map((item) =>{
            return(
                <div className="item">
                    <Card
                        style={{
                            display:'block',
                            color:'#f09503',    
                            transitionDuration:'0.3s',
                        }}
                        outline variant="outlined" key={item.id}
                        onClick={() => this.onSelectedItem(item.id)}
                        >
                        <CardHeader
                            title={`${item.itemName}`}
                            subheader={`Manufacturer: ${item.manufacturingCompany}`}
                        />
                        {/* <CardContent>
                            
                        </CardContent> */}
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
        });

        return(
            <Box paddingTop={7}>
                <Container maxWidth="xs">
                    {items}
                </Container>
            </Box>
            
        );
    }
}

export default Items;