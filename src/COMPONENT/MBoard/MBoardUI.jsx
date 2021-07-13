import React from "react";
import { PropTypes } from "prop-types";
// import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Hidden,
  // IconButton,
  // InputAdornment,
  Paper,
  // Snackbar,
  // TextField,
  Typography,
} from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
import {
  // changeSearch,
  getMboardData,
  // getSearchMboard,
  setCurrentMboard,
} from "../../BLL/mboardReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setMboardVisibility } from "../../BLL/modalWindowReducer";
import MBoardTable from "./MBoardTable";
import MBoardDialog from "./MBoardDialog";
import SoldOut from "../Common/SoldOut";
import MBoardComplete from "../Common/AutoComplete/MBoardComplete";
import InfoBlock from "../Common/InfoBlock";
// import VendorDialog from "../Vendors/VendorDialog";
// import CpuSocketDialog from "../CpuSocket/CpuSocketDialog";
// import RamSocketDialog from "../RamSocket/RamSocketDialog";
// import GraphSocketDialog from "../GraphSocket/GraphSocketDialog";
// import FormFactorDialog from "../FormFactor/FormFactorDialog";

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

const MBoardUI = (props) => {
  const {
    current,
    errorMessage,
    // searchField,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    // getMboard,
    // clearSearch,
    // getSearch,
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
    setCurrent(null); // FIXME проверить нуление current
    setVisibility({
      type: true,
      header: "Добавить материнскую плату",
      visibility: true,
    });
  };

  // const onSearch = (e) => {
  //   getSearch(e.target.value);
  // };

  // const onClear = () => {
  //   getMboard();
  //   clearSearch("");
  // };

  return (
    <>
      <MBoardDialog step />

      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar> */}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Материнские платы
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
              <MBoardComplete />
              {/* <TextField
                onChange={onSearch}
                value={searchField}
                variant="outlined"
                size="small"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={onClear} edge="end">
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            <MBoardTable />
          </Paper>
        </Grid>

        <Hidden mdDown>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="left" component="span">
                Информация:
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
                Информация:
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

MBoardUI.propTypes = {
  // searchField: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    intGraph: PropTypes.bool,
    socketRam: PropTypes.string,
    quantitySocketRam: PropTypes.number,
    socketGraph: PropTypes.string,
    quantityPCI: PropTypes.number,
    quantityPCIE: PropTypes.number,
    quantityIDE: PropTypes.number,
    quantitySATA: PropTypes.number,
    formFactor: PropTypes.string,
    intLAN: PropTypes.bool,
    intSound: PropTypes.bool,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  // getMboard: PropTypes.func.isRequired,
  // clearSearch: PropTypes.func.isRequired,
  // getSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.backEndMessage,
  // searchField: state.mboard.searchField,
  current: state.mboard.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentMboard,
  setVisibility: setMboardVisibility,
  getMboard: getMboardData,
  // clearSearch: changeSearch,
  // getSearch: getSearchMboard,
})(MBoardUI);
