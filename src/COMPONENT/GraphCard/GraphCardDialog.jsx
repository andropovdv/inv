/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import VendorSM from "../Common/Scroll/VendorSM";
import GraphSocketSM from "../Common/Scroll/GraphSocketSM";
import { setGraphCardVisibility } from "../../BLL/modalWindowReducer";
import {
  addGraphCardData,
  setBackEndMessage,
  setError,
  updateGraphCardData,
} from "../../BLL/graphCardReducer";

const useStyles = makeStyles((theme) => ({
  dialig: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  paper: {
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const GraphCardDialog = (props) => {
  const {
    searchField,
    pagination,
    step,
    modal,
    current,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    addGraphCard,
    updateGraphCard,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm({ mode: "onChange" });

  let location;
  if (!step) location = { paper: classes.dialig };

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
      const res = { ...data, volume: parseInt(data.volume, 10) };
      await addGraphCard(res, pagination.current, searchField);
    } else {
      const res = {
        ...data,
        id: current.id,
      };
      await updateGraphCard(res, pagination.current, searchField);
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
          {/* model */}
          <TextFieldSM
            control={control}
            current={current.model}
            errors={errors}
            nameField="model"
            desc="Модель"
          />
          {/* Vendor */}
          <VendorSM control={control} current={current} />
          {/* разъем */}
          <GraphSocketSM control={control} current={current} />
          {/* Volume */}
          <TextFieldSM
            control={control}
            current={current.volume}
            errors={errors}
            nameField="volume"
            desc="Объем памяти"
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмена
          </Button>
          <Button
            color="secondary"
            disabled={Object.keys(errors).length > 0}
            type="submit"
            variant="outlined"
          >
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

GraphCardDialog.propTypes = {
  step: PropTypes.bool,
  searchField: PropTypes.string.isRequired,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketGraph: PropTypes.string,
    volume: PropTypes.number,
  }),
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addGraphCard: PropTypes.func.isRequired,
  updateGraphCard: PropTypes.func.isRequired,
};

GraphCardDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    vendor: undefined,
    model: undefined,
    socketGraph: undefined,
    volume: undefined,
  },
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.graphCardVisibility,
  current: state.graphCard.current,
  searchField: state.graphCard.searchField,
  pagination: state.graphCard.pagination,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setGraphCardVisibility,
  addGraphCard: addGraphCardData,
  updateGraphCard: updateGraphCardData,
})(GraphCardDialog);
