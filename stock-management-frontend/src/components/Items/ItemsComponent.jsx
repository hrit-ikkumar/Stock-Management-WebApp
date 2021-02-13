import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import './index.css'; // custom css
import {Card, CardActions, CardContent, CardHeader, Typography, withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import CreateItemComponent from './CreateItemComponent/CreateItemComponent';
import ViewItemComponent from './ViewItemComponent/ViewItemComponent';
import EditItemComponent from './EditItemComponents/EditItemComponent';


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
    render(){
        // user defined styles are defined inside the classes
        const {classes} = this.props;
        
        const items = 
            this.props.items.isLoading!==true ?
                this.props.items.items.map((item) => {
                return(
                    <Box
                        key={item._id}
                        ml={8}
                        mr={8}
                        mt={4}
                        mb={2}>
                        <Card
                            style={{
                                display:'block',
                                color:'#2B6705',    
                                transitionDuration:'0.3s',
                            }}
                            variant="outlined"
                            >
                            <CardHeader
                                title={`${item.itemName}`}
                                subheader={`Company: ${item.manufacturingCompany}`}
                            />
                            <CardContent orientation="horizontal">
                                <Typography
                                    color="textPrimary">
                                    {`Stocks: ${item.currentStock}`}
                                </Typography>
                                <ButtonGroup>
                                    <Button 
                                        startIcon={<AddIcon/>}
                                        onClick={ event => {
                                            this.props.incrementCurrentStock(item._id);
                                        }}
                                    >
                                    </Button>
                                    <Button
                                        startIcon={<RemoveIcon />}
                                        onClick={ event => {
                                            this.props.decrementCurrentStock(item._id);
                                        }}>
                                    </Button>
                                </ButtonGroup>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup
                                    variant="contained"
                                    spacing={2}
                                    orientation="horizontal"
                                    fullWidth>
                                    <EditItemComponent item={item} editItem={this.props.editItem}/>
                                    <ViewItemComponent item={item} />
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        color="secondary"
                                        onClick={
                                            event => {
                                                this.props.deleteItem(item._id);
                                            }
                                        }
                                        >
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
                            <CreateItemComponent postItem={this.props.postItem} />
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