import React from 'react';
// Material UI Part
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    return(
        <Container className={classes.root}>
          <AppBar position="fixed">
              <Toolbar>
                {/* Header of application */}
                <Typography variant="h4" className={classes.title}>
                    Stock Management WebApp
                </Typography>
              </Toolbar>
          </AppBar>
        </Container>
    );
}

export default Header;