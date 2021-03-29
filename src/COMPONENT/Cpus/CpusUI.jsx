import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Snackbar,
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
  addCpusData,
  setCurrentCpu,
  setError,
  setBackEndMessage,
} from "../../BLL/cpuReducer";

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
    addCpu,
    errorMessage,
    setErrorCode,
    setErrorMessage,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  // TODO непонятноб как лучше управлять видимостью окон,
  // через redux или LocalState
  const handleClick = () => {
    setCurrent(null, null, null, null);
    setVisibilityCpu(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <>
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
              Справочники:/ Процессоры
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Grid item>
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
                  // onChange={}
                  // value={}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <CancelIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          <CpusTable />
          <CpuDialog operation={addCpu} />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация:
              {current.name}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

CpusUI.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
  setVisibilityCpu: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  addCpu: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.cpu.currentCpu,
  visibilityCpu: state.modalWindow.cpuVisibility,
  errorMessage: state.cpu.backEndMessage,
});

export default connect(mapStateToProps, {
  setVisibilityCpu: setCpuVisibility,
  setCurrent: setCurrentCpu,
  addCpu: addCpusData,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
})(CpusUI);
