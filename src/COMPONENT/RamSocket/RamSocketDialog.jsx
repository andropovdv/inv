import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  addTypeOfRamData,
  updateTypeOfRamData,
} from "../../BLL/typeOfRamReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setTypeOfRamVisibility } from "../../BLL/modalWindowReducer";
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
      const upSocket = { id: current.id, socketRam: data.socketRam };
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
          <TextFieldSM
            control={control}
            errors={errors}
            current={current.socketRam}
            nameField="socketRam"
            desc="Разъем RAM"
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
  searchField: PropTypes.string,

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
  searchField: "",
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
