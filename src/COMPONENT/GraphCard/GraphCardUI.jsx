import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Hidden,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  setBackEndMessage,
  setCurrentGraphCard,
  setError,
  getGraphCardData,
  changeSearch,
} from "../../BLL/graphCardReducer";
import { setGraphCardVisibility } from "../../BLL/modalWindowReducer";
import GraphCardTable from "./GraphCardTable";
import GraphCardDialog from "./GraphCardDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  buttonArea: {
    marginRight: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const GraphCardUI = (props) => {
  const {
    errorMessage,
    searchField,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    getGraphCard,
    clearSearch,
  } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClose = (reason) => {
    if (reason === "clickway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const addClick = () => {
    setCurrent(null);
    setVisibility({
      type: true,
      header: "Добавить графическую карту",
      visibility: true,
    });
  };

  const onSearch = (e) => {
    console.log("Search", e);
    // getSearch(e.target.value);
  };

  const onClear = () => {
    getGraphCard();
    clearSearch("");
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <GraphCardDialog />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники: / Графические карты
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center">
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonArea}
                onClick={addClick}
              >
                Добавить
              </Button>
              <TextField
                onChange={onSearch}
                value={searchField}
                size="small"
                label="Search"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={onClear} edge="end">
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
          <GraphCardTable />
        </Grid>
        <Hidden lgDown>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left">
                Информация:
              </Typography>
              Доделать
            </Paper>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left">
                Информация:
              </Typography>
              Доделать
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

GraphCardUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  getGraphCard: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapsStateToProps = (state) => ({
  errorMessage: state.graphCard.backEndMessage,
  searchField: state.graphCard.searchField,
});

export default connect(mapsStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentGraphCard,
  setVisibility: setGraphCardVisibility,
  getGraphCard: getGraphCardData,
  clearSearch: changeSearch,
})(GraphCardUI);
