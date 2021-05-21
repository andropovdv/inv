/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Controller, useForm } from "react-hook-form";
import { setBackEndMessage, setError } from "../../BLL/mboardReducer";
import { setMboardVisibility } from "../../BLL/modalWindowReducer";
import VendorSM from "../Common/Scroll/VendorSM";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: "1.1876 em",
    // minWidth: 0,
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const MBoardDialog = (props) => {
  const {
    current,
    step,
    modal,
    setErrorCode,
    setErrorMessage,
    setVisibility,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  let location;
  if (!step) location = { paper: classes.dialog };

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({
      type: false,
      header: "",
      visibility: false,
    });
  };

  return (
    <Dialog
      open={modal.visibility}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      classes={location}
    >
      <DialogTitle>{modal.header}</DialogTitle>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6} className={classes.paper}>
            <FormControl variant="outlined" fullWidth>
              <Box display="flex" alignItems="flex-end">
                <Box flexGrow={1}>
                  <InputLabel id="labelVendor">Производитель</InputLabel>
                  <VendorSM control={control} />
                </Box>
                <Box alignItems="flex-end">
                  <IconButton className={classes.button}>
                    <AddBoxIcon color="primary" fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
              <Controller
                as={
                  <TextField
                    className={classes.textField}
                    id="modelInput"
                    variant="outlined"
                    size="small"
                    error={!!errors.model}
                    label={errors.model ? errors.model.message : "Модель"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="model"
                control={control}
                rules={{
                  required: "Обязательное",
                  minLength: { value: 2, message: "Короткое" },
                }}
                defaultValue={current.model || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.paper}>
            <FormControl fullWidth>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography variant="subtitle1">
                    Встроенная графика (Test)
                  </Typography>
                </Box>
                <Box alignItems="flex-end">
                  <Switch color="primary" />
                </Box>
              </Box>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} variant="outlined">
          Отмера
        </Button>
      </DialogActions>
      {/* </form> */}
    </Dialog>
  );
};

MBoardDialog.propTypes = {
  step: PropTypes.bool.isRequired,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  current: PropTypes.shape({
    model: PropTypes.string,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.mboardVisibility,
  current: state.mboard.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setMboardVisibility,
})(MBoardDialog);
