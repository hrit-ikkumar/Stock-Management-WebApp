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

export default function CreateItemComponent() {
  const [open, setOpen] = React.useState(false);
  
  const classes = useStyles(); 

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        + New
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Item
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
                        placeholder="MATCH Stocks"
                        size="small"
                    />
                    <TextField
                        label="Current Stock"
                        id="outlined-size-small"
                        defaultValue="0"
                        type="number"
                        variant="outlined"
                        placeholder="1003"
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        label="Manufacturer"
                        id="outlined-full-width"
                        defaultValue=""
                        variant="outlined"
                        type="string"
                        placeholder="MyAnatomy"
                        size="small"
                    />
                    <TextField
                        label=""
                        id="outlined-helperText"
                        defaultValue="18/02/2021"
                        variant="outlined"
                        type="date"
                        size="small"
                    />
                </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}