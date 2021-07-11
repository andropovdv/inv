import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Hidden,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { compose } from "redux";
import CpusTable from "./CpusTable";
import CpuDialog from "./CpuDialog";
import { setCpuVisibility } from "../../BLL/modalWindowReducer";
import { setCurrentCpu } from "../../BLL/cpuReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import SoldOut from "../Common/SoldOut";
import InfoBlock from "../Common/InfoBlock";
import withAuthRedirect from "../HOC/withAuthRedirect";
import CpuComplete from "../Common/AutoComplete/CpuComplete";

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

const CpusUI = (props) => {
  const {
    current,
    setVisibilityCpu,
    setCurrent,
    errorMessage,
    setErrorCode,
    setErrorMessage,
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

  const handleClick = () => {
    setCurrent(null, null, null, null);
    setVisibilityCpu({
      type: true,
      header: "Добавить процессор",
      visibility: true,
    });
  };

  const rowInfo = [
    { name: "Производитель", val: current.vendor },
    { name: "Модель", val: current.model },
    { name: "Частота", val: String(current.freq) },
    { name: "Разъем процессора", val: current.socketCpu },
  ];

  return (
    <>
      <CpuDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Процессоры
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
              <CpuComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <CpusTable />
          </Paper>
        </Grid>

        <Hidden mdDown>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left" component="span">
                Подробно:
              </Typography>
              {Object.keys(current).length !== 0 ? (
                <InfoBlock rowInfo={rowInfo} />
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
                <InfoBlock rowInfo={rowInfo} />
              ) : null}
            </Paper>
          </Grid>
        </Hidden>
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
};

const mapStateToProps = (state) => ({
  current: state.cpu.currentCpu,
  errorMessage: state.error.backEndMessage,
  searchField: state.cpu.searchField,
});

export default compose(
  connect(mapStateToProps, {
    setVisibilityCpu: setCpuVisibility,
    setCurrent: setCurrentCpu,
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
  }),
  withAuthRedirect
)(CpusUI);
