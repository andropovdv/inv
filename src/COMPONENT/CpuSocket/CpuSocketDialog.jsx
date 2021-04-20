/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import {
  setError,
  setBackEndMessage,
  addSocketCpuData,
  updateSocketCpuData,
} from "../../BLL/typeSocketCpuReducer";

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

const CpuSocketDialog = (props) => {
  const {
    setVisibility,
    setErrorCode,
    setErrorMessage,
    addCpuSocket,
    updateSocket,
    currentGlobal,
    searchField,
    pagination,

    modal,
    current,
    step,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addCpuSocket(data, pagination.current, searchField);
    } else {
      const upSocket = { id: currentGlobal.id, socketCpu: data.socketCpu };
      await updateSocket(upSocket, pagination.current, searchField);
    }
    setVisibility({ type: false, header: "", visibility: false });
  };

  let location;
  if (!step) {
    location = { paper: classes.dialog };
  }

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
                placeholder="Cpu socket"
                margin="dense"
                label="Cpu socket"
                error={!!errors.socketCpu}
              />
            }
            name="socketCpu"
            control={control}
            rules={{ required: true }}
            defaultValue={current}
          />
          {errors.socketCpu && "is required"}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">SAVE</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CpuSocketDialog.defaultProps = {
  step: true,
};

CpuSocketDialog.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  addCpuSocket: PropTypes.func.isRequired,
  updateSocket: PropTypes.func.isRequired,

  current: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
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
  currentGlobal: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
  step: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.cpuSocketVisibility,
  currentGlobal: state.typeCpuSocket.currentType,
  searchField: state.typeCpuSocket.searchField,
  pagination: state.typeCpuSocket.pagination,
});

export default connect(mapStateToProps, {
  setVisibility: setCpuSoketVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  addCpuSocket: addSocketCpuData,
  updateSocket: updateSocketCpuData,
})(CpuSocketDialog);
