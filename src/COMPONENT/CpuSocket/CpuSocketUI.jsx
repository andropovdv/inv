import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Hidden,
} from "@material-ui/core";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import CpuSocketTable from "./CpuSocketTable";
import { setCurrentSocketCpu } from "../../BLL/typeSocketCpuReducer";
import CpuSocketDialog from "./CpuSocketDialog";
import SoldOut from "../Common/SoldOut";
import SocketCpuComplete from "../Common/AutoComplete/SocketCpuComplete";
import { setError, setBackEndMessage } from "../../BLL/errorReducer";
import InfoBlock from "../Common/InfoBlock";

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

const CpuSocketUI = (props) => {
  const {
    errorMessage,
    current,

    setVisibility,
    setErrorCode,
    setErrorMessage,
    setCurrent,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleAdd = () => {
    setCurrent(null, null);
    setVisibility({ type: true, header: "Добавить разъем", visibility: true });
  };

  const handleClose = (reason) => {
    if (reason === "clickway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const rowInfo = [{ name: "wiki", val: "wiki" }];

  return (
    <>
      <CpuSocketDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Разъемы процессоров
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
                onClick={handleAdd}
              >
                Добавить
              </Button>
              <SocketCpuComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <CpuSocketTable />
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

CpuSocketUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  current: state.typeCpuSocket.currentType,
  isLoading: state.typeCpuSocket.isLoading,
});

export default connect(mapStateToProps, {
  setVisibility: setCpuSoketVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentSocketCpu,
})(CpuSocketUI);
