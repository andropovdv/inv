import React from "react";
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
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Alert from "@material-ui/lab/Alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  setError,
  setBackEndMessage,
  setCurrentVendor,
  getSearchData,
  changeSearch,
  getVendorsData,
} from "../../BLL/vendorReducer";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";
import VendorTable from "./VendorTable";
import VendorDialog from "./VendorDialog";

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

const VendorUI = (props) => {
  const {
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    getSearch,
    clearSearch,
    getVendor,
    current,

    errorMessage,
    searchField,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  });

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const handleClick = () => {
    setCurrent(null, null, null, null);
    setVisibility({
      type: true,
      header: "Добавить производителя",
      visibility: true,
    });
  };

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  const onClear = () => {
    clearSearch("");
    getVendor();
  };

  return (
    <>
      <VendorDialog current={current} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="warning">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Производители
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
          <VendorTable />
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
                    <b>{current.vendor}</b>
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Полное:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    <b>{current.full}</b>
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Сайт:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {/* <b>{current.url}</b> */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${current.url}`}
                    >
                      {current.url}
                    </a>
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

VendorUI.propTypes = {
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  getVendor: PropTypes.func.isRequired,

  errorMessage: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.vendor.backEndMessage,
  searchField: state.vendor.searchField,
  current: state.vendor.currentVendor,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentVendor,
  setVisibility: setVendorVisibility,
  getSearch: getSearchData,
  clearSearch: changeSearch,
  getVendor: getVendorsData,
})(VendorUI);
