import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
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
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";
import {
  changeSearch,
  getSearchSocketGraph,
  getTypeOfGraphSlot,
  setBackEndMessage,
  setCurrentTypeOfGraph,
  setError,
} from "../../BLL/typeOfGraphSlotReducer";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";
import GraphSocketTable from "./GraphSocketTable";
import GraphSocketDialog from "./GraphSocketDialog";

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
  dialog: {
    position: "absolute",
    left: 10,
    top: 50,
  },
}));

const GraphSocketUI = (props) => {
  const {
    setErrorCode,
    setErrorMessage,
    setVisibility,
    setCurrent,
    clearSearch,
    getGraphSocket,
    getSearch,

    errorMessage,
    searchField,
    current,
  } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const clickAdd = () => {
    setCurrent(null, null);
    setVisibility({
      type: true,
      header: "Добавить разъем",
      visibility: true,
    });
  };

  const onClear = () => {
    clearSearch("");
    getGraphSocket();
  };

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  return (
    <>
      <GraphSocketDialog current={current} />
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Разъемы графических карт
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center">
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonArea}
                onClick={clickAdd}
              >
                Добавить
              </Button>
              <TextField
                size="small"
                variant="outlined"
                className={classes.buttonArea}
                label="Search"
                onChange={onSearch}
                value={searchField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onClear} edge="end">
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
          <GraphSocketTable />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация
            </Typography>
            {Object.keys(current).length !== 0 ? (
              <Box direction="colunm">
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Название:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.socketGraph}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

GraphSocketUI.propTypes = {
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  getGraphSocket: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,

  errorMessage: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.typeOfGraphSlot.backEndMessage,
  searchField: state.typeOfGraphSlot.searchField,
  current: state.typeOfGraphSlot.currentType,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentTypeOfGraph,
  setVisibility: setTypeOfGraphSlotVisibility,
  clearSearch: changeSearch,
  getGraphSocket: getTypeOfGraphSlot,
  getSearch: getSearchSocketGraph,
})(GraphSocketUI);
