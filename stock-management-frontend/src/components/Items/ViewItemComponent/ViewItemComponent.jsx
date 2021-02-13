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
// import {makeStyles} from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Info from '@material-ui/icons/Info';

// const useStyles = makeStyles((theme) => ({
//   root: {
//       '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: 200,
//       },
//   },
// }));
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

export default function ViewItemComponent({item}) {
  // React HOOKS
  const [open, setOpen] = React.useState(false);
  const dateAddedValue = new Date(item.dateAdded).toLocaleDateString();

  // const classes = useStyles(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
          variant="contained"
          startIcon={<Info />}
          onClick={handleClickOpen}>
          View
      </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
          maxWidth="md">
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {item.itemName}
          </DialogTitle>
          <DialogContent dividers>
              <Typography
                variant="h6">Item Name: {item.itemName}</Typography>
              <Typography
                variant="h6">Company: {item.manufacturingCompany}</Typography>
              <Typography
                variant="h6">Current Stock: {item.currentStock}</Typography>
              <Typography
                variant="h6">Date Added: {dateAddedValue}</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="filled" autoFocus onClick={handleClose} color="primary">
              Hide
            </Button>
          </DialogActions>  
        </Dialog>
    </div>
  );
}