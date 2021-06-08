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

const useStyles = makeStyles((theme) => ({
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
  textField: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const CpuSocketDialog = (props) => {
  const {
    setVisibility,
    setErrorCode,
    setErrorMessage,
    addCpuSocket,
    updateSocket,
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
      const upSocket = { id: current.id, socketCpu: data.socketCpu };
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
                margin="dense"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label={
                  errors.socketCpu
                    ? errors.socketCpu.message
                    : "Разъем процессора"
                }
                error={!!errors.socketCpu}
              />
            }
            name="socketCpu"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={current.socketCpu || ""}
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" variant="outlined" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" variant="outlined" color="secondary">
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CpuSocketDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    socketCpu: undefined,
  },
};

CpuSocketDialog.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  addCpuSocket: PropTypes.func.isRequired,
  updateSocket: PropTypes.func.isRequired,

  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }),
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
  step: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.cpuSocketVisibility,
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
