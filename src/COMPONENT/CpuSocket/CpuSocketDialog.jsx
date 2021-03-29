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
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import {
  setError,
  setBackEndMessage,
  addSocketCpuData,
  updateSocketCpuData,
} from "../../BLL/typeSocketCpuReducer";

const CpuSocketDialog = (props) => {
  const {
    setVisibility,
    setErrorCode,
    setErrorMessage,
    modal,
    current,
    addCpuSocket,
    updateSocket,
    currentGlobal,
  } = props;

  const { handleSubmit, control, errors } = useForm();

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addCpuSocket(data);
    } else {
      const req = { id: currentGlobal.id, socketCpu: data.socketCpu };
      await updateSocket(req);
    }
    setVisibility({ type: false, header: "", visibility: false });
  };

  return (
    <Dialog open={modal.visibility} onClose={onClose} maxWidth="sm" fullWidth>
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

CpuSocketDialog.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  addCpuSocket: PropTypes.func.isRequired,
  updateSocket: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  currentGlobal: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.typeCpuSocket.isLoading,
  modal: state.modalWindow.cpuSocketVisibility,
  currentGlobal: state.typeCpuSocket.currentType,
});

export default connect(mapStateToProps, {
  setVisibility: setCpuSoketVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  addCpuSocket: addSocketCpuData,
  updateSocket: updateSocketCpuData,
})(CpuSocketDialog);
