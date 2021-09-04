import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";
import { compose } from "redux";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setSocketSdVisibility } from "../../BLL/modalWindowReducer";
import { setCurrentSocketSd } from "../../BLL/typeOfSocketSdReducer";
import SoldOut from "../Common/SoldOut";
import SdSocketDialog from "./SdSocketDialog";
import SdSocketComplete from "../Common/AutoComplete/SdSocketComplete";
import InfoBlock from "../Common/InfoBlock";
import SdSocketTable from "./SdSocketTable";
import withAuthRedirect from "../HOC/withAuthRedirect";

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

const SdSocketUI = (props) => {
  const {
    current,
    errorMessage,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    setCurrent,
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

  const handleClick = () => {
    setCurrent(null, null);
    setVisibility({
      type: true,
      header: "Добавить разъем SD",
      visibility: true,
    });
  };
  return (
    <>
      <SdSocketDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Разъемы storage devices
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
                onClick={handleClick}
              >
                Добавить
              </Button>
              <SdSocketComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <SdSocketTable />
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

SdSocketUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socket: PropTypes.string,
  }).isRequired,
};

const mapsStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  current: state.socketSd.current,
});

export default compose(
  connect(mapsStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setVisibility: setSocketSdVisibility,
    setCurrent: setCurrentSocketSd,
  }),
  withAuthRedirect
)(SdSocketUI);
