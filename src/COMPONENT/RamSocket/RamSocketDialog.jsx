/* eslint-disable react/jsx-wrap-multilines */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  addTypeOfRamData,
  setBackEndMessage,
  setError,
  updateTypeOfRamData,
} from "../../BLL/typeOfRamReducer";
import { setTypeOfRamVisibility } from "../../BLL/modalWindowReducer";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const RamSocketDialog = (props) => {
  const {
    modal,
    step,
    pagination,
    searchField,
    current,

    setErrorCode,
    setErrorMessage,
    setVisibility,
    addRamSocket,
    updateRamSocket,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  let location;
  if (!step) {
    location = { paper: classes.dialog };
  }

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({
      type: false,
      header: "",
      visibility: false,
    });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addRamSocket(data, pagination.current, searchField);
    } else {
      const upSocket = { id: current.id, ramSocket: data.socketRam };
      await updateRamSocket(upSocket, pagination.current, searchField);
    }
    setVisibility({ type: false, header: "", visibility: false });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                margin="dense"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label={
                  errors.socketRam ? errors.socketRam.message : "Разъем RAM"
                }
                error={!!errors.socketRam}
              />
            }
            name="socketRam"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={current.socketRam || ""}
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмена
          </Button>
          <Button color="secondary" type="submit" variant="outlined">
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

RamSocketDialog.propTypes = {
  step: PropTypes.bool,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }),
  searchField: PropTypes.string.isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addRamSocket: PropTypes.func.isRequired,
  updateRamSocket: PropTypes.func.isRequired,
};

RamSocketDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    socketRam: undefined,
  },
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.typeOfRamVisibility,
  pagination: state.typeOfRam.pagination,
  searchField: state.typeOfRam.searchField,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setTypeOfRamVisibility,
  addRamSocket: addTypeOfRamData,
  updateRamSocket: updateTypeOfRamData,
})(RamSocketDialog);
