/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import {
  addSocketCpuData,
  updateSocketCpuData,
} from "../../BLL/typeSocketCpuReducer";
import { setError, setBackEndMessage } from "../../BLL/errorReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";

const useStyles = makeStyles(() => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
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
          <TextFieldSM
            control={control}
            errors={errors}
            current={current.socketCpu}
            nameField="socketCpu"
            desc="Разъем процессора"
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" variant="outlined" onClick={onClose}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            disabled={Object.keys(errors).length > 0}
          >
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
  searchField: "",
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
  searchField: PropTypes.string,
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
