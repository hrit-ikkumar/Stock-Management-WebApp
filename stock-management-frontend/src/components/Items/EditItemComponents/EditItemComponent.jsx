import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditItemComponent({item, editItem}) {
  // React HOOKS
  var date = new Date(item.dateAdded);
  const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
  const [open, setOpen] = React.useState(false);
  const [itemName, setitemName] = React.useState(item.itemName);
  const [dateAdded, setdateAdded] = React.useState(dateString);
  const [currentStok, setCurrentStock] = React.useState(item.currentStock);
  const [manufacturingCompany, setManufacturingCompany] = React.useState(item.manufacturingCompany);

  const classes = useStyles(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const newItemName = itemName;
    const newDateAdded = new Date(dateAdded);
    const newCurrentStock = currentStok;
    const newManfuacturingCompany = manufacturingCompany;
    let newItem = item;
    newItem.itemName = newItemName;
    newItem.dateAdded = newDateAdded;
    newItem.currentStock = newCurrentStock;
    newItem.manufacturingCompany = newManfuacturingCompany;
    editItem(newItem);
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
            onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
          maxWidth="md">
          <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
            Edit: {item.itemName}
          </DialogTitle>
          <DialogContent dividers>
          <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        label="Item Name"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        type="string"
                        value={itemName}
                        onChange={(event) => {setitemName(event.target.value)}}
                        placeholder="MATCH Stocks"
                        size="small"
                    />
                    <TextField
                        label="Current Stock"
                        id="outlined-size-small"
                        type="number"
                        variant="outlined"
                        value={currentStok}
                        onChange={(event) => setCurrentStock(event.target.value)}
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        label="Manufacturer"
                        id="outlined-full-width"
                        variant="outlined"
                        type="string"
                        value={manufacturingCompany}
                        onChange={(event) => setManufacturingCompany(event.target.value)}
                        placeholder="MyAnatomy"
                        size="small"
                    />
                    <TextField
                        label=""
                        id="outlined-helperText"
                        variant="outlined"
                        value={dateAdded}
                        onChange={(event) => setdateAdded(event.target.value)}
                        type="date"
                        size="small"
                    />
                </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="filled" autoFocus onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>  
        </Dialog>
    </div>
  );
}
