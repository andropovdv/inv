import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setSocketSdVisibility } from "../../BLL/modalWindowReducer";
import {
  addSocketSdData,
  updateSocketSdData,
} from "../../BLL/typeOfSocketSdReducer";
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

const SdSocketDialog = (props) => {
  const {
    step,
    current,
    pagination,
    searchField,
    modal,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    addSocket,
    updateSocket,
  } = props;

  const { handleSubmit, control, errors } = useForm({ mode: "onChange " });

  const classes = useStyles();

  let location;
  if (!step) location = { paper: classes.dialog };

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addSocket(data, pagination.current, searchField);
    } else {
      const res = { ...data, id: current.id };
      await updateSocket(res, pagination.current, searchField);
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
          <TextFieldSM
            control={control}
            errors={errors}
            current={current.socket}
            nameField="socket"
            desc="Разъем storage device"
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмена
          </Button>
          <Button
            color="secondary"
            type="submit"
            variant="outlined"
            disabled={Object.keys(errors).length > 0}
          >
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

SdSocketDialog.propTypes = {
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addSocket: PropTypes.func.isRequired,
  updateSocket: PropTypes.func.isRequired,
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
    socket: PropTypes.string,
  }),
  searchField: PropTypes.string,
  step: PropTypes.bool,
};

SdSocketDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    socket: undefined,
  },
  searchField: "",
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.socketSdVisibility,
  searchField: state.socketSd.searchField,
  pagination: state.socketSd.pagination,
  current: state.socketSd.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setSocketSdVisibility,
  addSocket: addSocketSdData,
  updateSocket: updateSocketSdData,
})(SdSocketDialog);
