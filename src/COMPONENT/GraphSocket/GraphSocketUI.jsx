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
import { setCurrentTypeOfGraph } from "../../BLL/typeOfGraphSlotReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";
import GraphSocketTable from "./GraphSocketTable";
import GraphSocketDialog from "./GraphSocketDialog";
import SoldOut from "../Common/SoldOut";
import InfoBlock from "../Common/InfoBlock";
import withAuthRedirect from "../HOC/withAuthRedirect";
import GraphSocketComplete from "../Common/AutoComplete/GraphSocketComplete";

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

const GraphSocketUI = (props) => {
  const {
    setErrorCode,
    setErrorMessage,
    setVisibility,
    setCurrent,

    errorMessage,
    current,
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

  const clickAdd = () => {
    setCurrent(null, null);
    setVisibility({
      type: true,
      header: "Добавить разъем",
      visibility: true,
    });
  };

  const rowInfo = [{ name: "wii", val: "wiki" }];

  return (
    <>
      <GraphSocketDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Разъемы графических карт
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
                onClick={clickAdd}
              >
                Добавить
              </Button>
              <GraphSocketComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <GraphSocketTable />
          </Paper>
        </Grid>

        <Hidden mdDown>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left" component="span">
                Информация
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
                Информация
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

GraphSocketUI.propTypes = {
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,

  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  current: state.typeOfGraphSlot.currentType,
});

export default compose(
  connect(mapStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setCurrent: setCurrentTypeOfGraph,
    setVisibility: setTypeOfGraphSlotVisibility,
  }),
  withAuthRedirect
)(GraphSocketUI);
