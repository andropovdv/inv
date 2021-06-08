import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Box,
} from "@material-ui/core";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CpusTable from "./CpusTable";
import CpuDialog from "./CpuDialog";
import { setCpuVisibility } from "../../BLL/modalWindowReducer";
import {
  setCurrentCpu,
  setError,
  setBackEndMessage,
  getSearchCpu,
  changeSearch,
  getCpusData,
} from "../../BLL/cpuReducer";
import CpuSocketDialog from "../CpuSocket/CpuSocketDialog";
import VendorDialog from "../Vendors/VendorDialog";

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

const CpusUI = (props) => {
  const {
    current,
    setVisibilityCpu,
    setCurrent,
    errorMessage,
    setErrorCode,
    setErrorMessage,
    getSearch,
    searchField,
    clearSearch,
    getCpu,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  // TODO непонятноб как лучше управлять видимостью окон,
  // через redux или LocalState
  const handleClick = () => {
    setCurrent(null, null, null, null);
    setVisibilityCpu({
      type: true,
      header: "Добавить процессор",
      visibility: true,
    });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  const onClear = () => {
    clearSearch("");
    getCpu();
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Процессоры
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
                onClick={handleClick}
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
          <CpusTable />
          <CpuDialog />
          <CpuSocketDialog current={current} step={false} />
          <VendorDialog step={false} />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация:
            </Typography>
            {Object.keys(current).length !== 0 ? (
              <Box direction="column">
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Производитель:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.vendor}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1}>Модель:</Box>
                  <Box>{current.model}</Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1}>Частота:</Box>
                  <Box>{current.freq}</Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Разъем процессора:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.socketCpu}
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

CpusUI.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    freq: PropTypes.number,
  }).isRequired,
  setVisibilityCpu: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  clearSearch: PropTypes.func.isRequired,
  getCpu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.cpu.currentCpu,
  errorMessage: state.cpu.backEndMessage,
  searchField: state.cpu.searchField,
});

export default connect(mapStateToProps, {
  setVisibilityCpu: setCpuVisibility,
  setCurrent: setCurrentCpu,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  getSearch: getSearchCpu,
  clearSearch: changeSearch,
  getCpu: getCpusData,
})(CpusUI);
