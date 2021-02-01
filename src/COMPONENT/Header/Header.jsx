import React from "react";
import { PropTypes } from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import UserStatus from "../UserStatus/UserStatus";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { handleOpen } = props;
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Container>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              className={classes.menuButton}
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Inventor
            </Typography>
            <Box>
              <UserStatus />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};

export default Header;
