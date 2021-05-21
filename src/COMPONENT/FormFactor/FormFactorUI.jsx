import CancelIcon from "@material-ui/icons/Cancel";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  changeSearch,
  getFormFactor,
  getSearchFormFactor,
  setBackEndMessage,
  setCurrentFormFactor,
  setError,
} from "../../BLL/formFactorReducer";
import { setFormFactorVisibility } from "../../BLL/modalWindowReducer";
import FormFactorTable from "./FormFactorTable";
import FormFactorDialog from "./FormFactorDialog";

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
    searchField,
    errorMessage,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    getSearch,
    getFactor,
    clearSearch,
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

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  const onClear = () => {
    getFactor();
    clearSearch("");
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Форм-фактор
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
                onClick={addClick}
              >
                Добавить
              </Button>
              <TextField
                onChange={onSearch}
                value={searchField}
                variant="outlined"
                size="small"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={onClear}>
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
          <FormFactorTable />
          <FormFactorDialog step={false} />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация (Доделать)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

FormFactorUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  getFactor: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.formFactor.backEndMessage,
  searchField: state.formFactor.searchField,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentFormFactor,
  setVisibility: setFormFactorVisibility,
  getSearch: getSearchFormFactor,
  getFactor: getFormFactor,
  clearSearch: changeSearch,
})(FormFactorUI);
