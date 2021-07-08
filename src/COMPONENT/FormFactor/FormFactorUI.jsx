// import CancelIcon from "@material-ui/icons/Cancel";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";
import { compose } from "redux";
import { setCurrentFormFactor } from "../../BLL/formFactorReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setFormFactorVisibility } from "../../BLL/modalWindowReducer";
import FormFactorTable from "./FormFactorTable";
import FormFactorDialog from "./FormFactorDialog";
import SoldOut from "../Common/SoldOut";
import InfoBlock from "../Common/InfoBlock";
import withAuthRedirect from "../HOC/withAuthRedirect";
import FormFactorComplete from "../Common/AutoComplete/FormFactorComplete";

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

const FormFactorUI = (props) => {
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
    setCurrent(null, null);
    setVisibility({
      type: true,
      header: "Добавить форм-фактор",
      visibility: true,
    });
  };

  const rowInfo = [{ name: "wiki", val: "wiki" }];

  return (
    <>
      <FormFactorDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Форм-фактор
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
              <FormFactorComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <FormFactorTable />
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

FormFactorUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactor: PropTypes.string,
  }).isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  searchField: state.formFactor.searchField,
  current: state.formFactor.currentType,
});

export default compose(
  connect(mapStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setCurrent: setCurrentFormFactor,
    setVisibility: setFormFactorVisibility,
  }),
  withAuthRedirect
)(FormFactorUI);
