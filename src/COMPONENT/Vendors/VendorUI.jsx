import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Hidden,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import VendorComplete from "../Common/AutoComplete/VendorComplete";
import { setCurrentVendor } from "../../BLL/vendorReducer";
import { setError, setBackEndMessage } from "../../BLL/errorReducer";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";
import VendorTable from "./VendorTable";
import VendorDialog from "./VendorDialog";
import SoldOut from "../Common/SoldOut";
import InfoBlock from "../Common/InfoBlock";
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

const VendorUI = (props) => {
  const {
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,

    current,
    errorMessage,
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
    setVisibility({
      type: true,
      header: "Добавить производителя",
      visibility: true,
    });
  };

  const rowInfo = [
    { name: "Наименование", val: current.vendor },
    { name: "Полное", val: current.full },
    { name: "Сайт", val: current.url },
  ];

  return (
    <>
      <VendorDialog current={current} />
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Производители
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
              <VendorComplete />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <VendorTable />
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

VendorUI.propTypes = {
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,

  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  current: state.vendor.currentVendor,
  errorMessage: state.error.backEndMessage,
});

export default compose(
  connect(mapStateToProps, {
    setErrorCode: setError,
    setErrorMessage: setBackEndMessage,
    setCurrent: setCurrentVendor,
    setVisibility: setVendorVisibility,
  }),
  withAuthRedirect
)(VendorUI);
