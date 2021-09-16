import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setCurrentStorageDevice } from "../../BLL/storageDeviceReducer";
import { setStorageDeviceVisibility } from "../../BLL/modalWindowReducer";
import StorageDeviceDialog from "./StorageDeviceDialog";
import SoldOut from "../Common/SoldOut";
import StorageDeviceTable from "./StorageDeviceTable";
import InfoBlock from "../Common/InfoBlock";
import StorageDeviceAutoComplete from "../Common/AutoComplete/StorageDeviceAutoComplete";

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

const StorageDeviceUI = (props) => {
  const {
    current,
    errorMessage,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
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
      header: "Добавить устройство хранения",
      visibility: true,
    });
  };

  return (
    <>
      <StorageDeviceDialog />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Устройства хранения
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
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
              <StorageDeviceAutoComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <StorageDeviceTable />
          </Paper>
        </Grid>

        <Hidden mdDown>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left" component="span">
                Подробно:
              </Typography>
              {Object.keys(current).length !== 0 ? (
                <InfoBlock current={current} />
              ) : null}
            </Paper>
          </Grid>
        </Hidden>

        <Hidden lgUp>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left" component="span">
                Подробно:
              </Typography>
              {Object.keys(current).length !== 0 ? (
                <InfoBlock current={current} />
              ) : null}
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

StorageDeviceUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    volume: PropTypes.number,
    socket: PropTypes.string,
    formFactor: PropTypes.string,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  current: state.storageDevice.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentStorageDevice,
  setVisibility: setStorageDeviceVisibility,
})(StorageDeviceUI);
