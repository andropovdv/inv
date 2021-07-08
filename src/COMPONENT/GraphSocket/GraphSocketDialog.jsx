import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  addTypeOfGraphSlot,
  updateTypeOfGraphSlot,
} from "../../BLL/typeOfGraphSlotReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";

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
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
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
      const upSocket = { id: current.id, socketGraph: data.socketGraph };
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
          <TextFieldSM
            control={control}
            errors={errors}
            current={current.socketGraph}
            nameField="socketGraph"
            desc="Разъем видео карты"
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

GraphSocketDialog.propTypes = {
  step: PropTypes.bool,
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
    socketGraph: PropTypes.string,
  }),
  searchField: PropTypes.string,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addGraphSocket: PropTypes.func.isRequired,
  updateGraphSocket: PropTypes.func.isRequired,
};

GraphSocketDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    socketGraph: undefined,
  },
  searchField: "",
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.typeOfGraphSlotVisibility,
  pagination: state.typeOfGraphSlot.pagination,
  searchField: state.typeOfGraphSlot.searchField,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setTypeOfGraphSlotVisibility,
  addGraphSocket: addTypeOfGraphSlot,
  updateGraphSocket: updateTypeOfGraphSlot,
})(GraphSocketDialog);
