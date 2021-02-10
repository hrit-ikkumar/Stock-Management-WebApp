import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import './index.css'; // custom css
import Info from '@material-ui/icons/Info';
import {Card, CardActions, CardContent, CardHeader, Container, IconButton, makeStyles, Typography, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import CreateItemComponent from './createItemComponent.jsx/createItemComponent';

const useStyles = (theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
    closeButton: {
        position:'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

class Items extends Component{
    constructor(props)
    {
        super(props);
        
        // It's own state
        this.state = {
            selectedItem: null,
            isLoading: true,
            items: null,
        };
        this.onSelectedItem = this.onSelectedItem.bind(this) // binding in class constructor
    }

    /* onSelectedItem function for keeping track of selected item in given items */
    onSelectedItem(item){
        // setState is async function if you want to run the code in sync way you can pass callback function
        this.setState({selectedItem: item},
            () => console.log(this.state.selectedItem));
    }
    /*
    arrow function way
    onSelected = (item) => {

    }
    */

    componentDidMount(){
        // console.log("componentDidMount called!");
    }
    componentDidUpdate (){
        // console.log("componentDidUpdate called!");
    }
    // Deprecated X
    // Use then
    async componentWillMount(){
        // console.log("Component Will Mount");
        const url = "http://localhost:3001/itemRouter";
        const response = await fetch(url); // GET Request
        const data = await response.json(); 
        this.setState({items:data, isLoading:false}); // saving data and setting isLoading to false.
    }

    render(){
        // user defined styles are defined inside the classes
        const {classes} = this.props;
        
        // All the items are loaded here by iterating through all
        // all the items in db
        const items = 
            this.state.isLoading!==true ?
                this.state.items.map((item) => {
                return(
                    <Box
                        ml={8}
                        mr={8}
                        mt={4}
                        mb={2}
                        size='xs'>
                        <Card
                            style={{
                                display:'block',
                                color:'#2B6705',    
                                transitionDuration:'0.3s',
                            }}
                            outline
                            variant="outlined"
                            key={item.id}
                            onClick={() => this.onSelectedItem(item.id)}
                            >
                            <CardHeader
                                title={`${item.itemName}`}
                                subheader={`Manufacturer: ${item.manufacturingCompany}`}
                            />
                            <CardContent orientation="horizontal">
                                <Typography>
                                    {`Current Stocks: ${item.currentStock}`}
                                </Typography>
                                <ButtonGroup>
                                    <Button 
                                        startIcon={<AddIcon/>}>
                                    </Button>
                                    <Button
                                        startIcon={<RemoveIcon />}>
                                    </Button>
                                </ButtonGroup>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup
                                    orientation="horizontal"
                                    fullWidth="true"
                                    size="xs">
                                    <Button
                                        startIcon={<SaveIcon />}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        startIcon={<Info />}
                                        color="success"
                                        >
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
                    </Box>
                );
            })
            :
            <div>Loading...</div>;

        return(
            <Grid
                container
                className={classes.root}
                spacing={1}>
                <Grid 
                    item 
                    xs={12}>
                    <Box
                        mt={10}
                        ml={10}>
                            <CreateItemComponent />
                    </Box>
                    <Grid
                        container 
                        justify="center">
                            {items}
                    </Grid>
                    {/* Pagination Component in todo */}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Items);