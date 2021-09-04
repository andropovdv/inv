import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
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
import withAuthRedirect from "../HOC/withAuthRedirect";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setCurrentFormFactorSD } from "../../BLL/formFactorSdReducer";
import { setFormFactorSDVisibility } from "../../BLL/modalWindowReducer";
import SoldOut from "../Common/SoldOut";
import FormFactorSDDialog from "./FormFactorSDDialog";
import FormFactorSDTable from "./FormFactorSDTable";
import InfoBlock from "../Common/InfoBlock";
import FormFactorSDComplete from "../Common/AutoComplete/FormFactorSDComplete";

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

const FormFactorSDUI = (props) => {
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

  const handleClick = () => {
    setCurrent(null, null);
    setVisibility({
      type: true,
      header: "Добавить форм-фактор Storage Device",
      visibility: true,
    });
  };

  return (
    <>
      <FormFactorSDDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Форм фактор storage device
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
              <FormFactorSDComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <FormFactorSDTable />
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

FormFactorSDUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactorSD: PropTypes.string,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  current: state.formFactorSd.current,
});

export default compose(
  connect(mapStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setCurrent: setCurrentFormFactorSD,
    setVisibility: setFormFactorSDVisibility,
  }),
  withAuthRedirect
)(FormFactorSDUI);
