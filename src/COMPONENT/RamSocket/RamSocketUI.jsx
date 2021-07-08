import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { setCurrentTypeOfRam } from "../../BLL/typeOfRamReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setTypeOfRamVisibility } from "../../BLL/modalWindowReducer";
import RamSocketTable from "./RamSocketTable";
import RamSocketDialog from "./RamSocketDialog";
import SoldOut from "../Common/SoldOut";
import InfoBlock from "../Common/InfoBlock";
import withAuthRedirect from "../HOC/withAuthRedirect";
import RamSocketComplete from "../Common/AutoComplete/RamSocketComplete";

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
    current,

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

  const handleAdd = () => {
    setCurrent(null, null);
    setVisibility({ type: true, header: "Добавить разъем", visibility: true });
  };

  const rowInfo = [{ name: "wiki", val: "wiki" }];

  return (
    <>
      <RamSocketDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Разъемы оперативной памяти
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
              <RamSocketComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <RamSocketTable />
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

RamSocketUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }).isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  searchField: state.typeOfRam.searchField,
  current: state.typeOfRam.currentType,
});

export default compose(
  connect(mapStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setCurrent: setCurrentTypeOfRam,
    setVisibility: setTypeOfRamVisibility,
  }),
  withAuthRedirect
)(RamSocketUI);
