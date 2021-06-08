import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import CancelIcon from "@material-ui/icons/Cancel";
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
import { connect } from "react-redux";
import {
  changeSearch,
  getSearchSocketRam,
  getTypeOfRamData,
  setBackEndMessage,
  setCurrentTypeOfRam,
  setError,
} from "../../BLL/typeOfRamReducer";
import { setTypeOfRamVisibility } from "../../BLL/modalWindowReducer";
import RamSocketTable from "./RamSocketTable";
import RamSocketDialog from "./RamSocketDialog";

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

const RamSocketUI = (props) => {
  const {
    errorMessage,
    searchField,
    current,

    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    getSearch,
    getSocket,
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

  const handleAdd = () => {
    setCurrent(null, null);
    setVisibility({ type: true, header: "Добавить разъем", visibility: true });
  };

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  const onClear = () => {
    getSocket();
    clearSearch("");
  };

  return (
    <>
      <RamSocketDialog current={current} />
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
              Справочники:/ Разъемы оперативной памяти
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
                onClick={handleAdd}
              >
                Добавить
              </Button>
              <TextField
                onChange={onSearch}
                value={searchField}
                size="small"
                variant="outlined"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={onClear}>
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
          <RamSocketTable />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация (Доделать)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

RamSocketUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }).isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  getSocket: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.typeOfRam.backEndMessage,
  searchField: state.typeOfRam.searchField,
  current: state.typeOfRam.currentType,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentTypeOfRam,
  setVisibility: setTypeOfRamVisibility,
  getSearch: getSearchSocketRam,
  getSocket: getTypeOfRamData,
  clearSearch: changeSearch,
})(RamSocketUI);
