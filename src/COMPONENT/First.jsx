import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import { CssBaseline, Typography } from '@material-ui/core';
import { Route } from 'react-router-dom';
import VendorsContainer from './Vendors/VendorsContainer';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    mainContent: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
          }
    },
    toolBar: theme.mixins.toolbar,
}))



const First = (props) => {

    const classes = useStyles();

    const [openLeft, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header handleOpen={handleOpen} />
            <nav>
                <Navbar
                    openLeft={openLeft}
                    handleClose={handleClose}
                />
            </nav>
            <main className={classes.mainContent}>
                <div className={classes.toolBar}/>
                {/* <Typography variant="h6" align="left">Производители:</Typography> */}
                <Route path='/Vendors' render={() => <VendorsContainer />} />
            </main>
        </div>
    )
}

export default First;