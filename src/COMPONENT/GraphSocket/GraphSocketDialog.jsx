/* eslint-disable react/jsx-wrap-multilines */

import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import {
  addTypeOfGraphSlot,
  setBackEndMessage,
  setError,
  updateTypeOfGraphSlot,
} from "../../BLL/typeOfGraphSlotReducer";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";

const useStyles = makeStyles(() => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  dialog1: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const GraphSocketDialog = (props) => {
  const {
    modal,
    step,
    pagination,
    searchField,
    current,

    setErrorCode,
    setErrorMessage,
    setVisibility,
    addGraphSocket,
    updateGraphSocket,
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
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addGraphSocket(data, pagination.current, searchField);
    } else {
      const upSocket = { id: current.id, graphSocket: data.socketGraph };
      await updateGraphSocket(upSocket, pagination.current, searchField);
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
                label={errors.model ? errors.model.message : null} // FIXME correct
                error={!!errors.socketGraph}
              />
            }
            name="socketGraph"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={current.graphSocket || ""}
          />
        </DialogContent>
        <DialogActions>
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

GraphSocketDialog.propTypes = {
  step: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    graphSocket: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string.isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addGraphSocket: PropTypes.func.isRequired,
  updateGraphSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.typeOfGraphSlotVisibility,
  pagination: state.typeOfGraphSlot.pagination,
  searchField: state.typeOfGraphSlot.searchField,
  current: state.typeOfGraphSlot.currentType,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setTypeOfGraphSlotVisibility,
  addGraphSocket: addTypeOfGraphSlot,
  updateGraphSocket: updateTypeOfGraphSlot,
})(GraphSocketDialog);
