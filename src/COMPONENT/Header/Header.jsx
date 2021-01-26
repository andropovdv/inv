import React from 'react';
import s from './Header.module.css';
import UserStatus from '../UserStatus/UserStatus';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    title: {
        flexGrow: 1
    }
}))

const Header = (props) => {
    const classes = useStyles();
    return (
        <div >
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Container>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            className={classes.menuButton}
                            onClick={props.handleOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Inventor</Typography>
                        <Box>
                            <UserStatus />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Header;