/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Alert from "@material-ui/lab/Alert";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import CpuSocketTable from "./CpuSocketTable";
import {
  setError,
  setBackEndMessage,
  setCurrentSocketCpu,
} from "../../BLL/typeSocketCpuReducer";
import CpuSocketDialog from "./CpuSocketDialog";

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
    setVisibility,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    current,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClick = () => {
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
              Справочники:/ Разъемы процессоров
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
                label="Search"
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
            </Box>
          </Paper>
          <CpuSocketTable />
          <CpuSocketDialog current={current.socketCpu || ""} />
        </Grid>
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
  errorMessage: state.typeCpuSocket.backEndMessage,
  current: state.typeCpuSocket.currentType,
});

export default connect(mapStateToProps, {
  setVisibility: setCpuSoketVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentSocketCpu,
})(CpuSocketUI);
