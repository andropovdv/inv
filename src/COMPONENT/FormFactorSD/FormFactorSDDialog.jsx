import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { setError, setBackEndMessage } from "../../BLL/errorReducer";
import { setFormFactorSDVisibility } from "../../BLL/modalWindowReducer";
import { addFactorSD, updateFactorSD } from "../../BLL/formFactorSdReducer";
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

const FormFactorSDDialog = (props) => {
  const {
    current,
    searchField,
    pagination,
    modal,
    step,
    setErrorMessage,
    setErrorCode,
    setVisibility,
    addFactor,
    updateFactor,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm({ mode: "onChange" });

  let location;
  if (!step) location = { paper: classes.dialog };

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addFactor(data, pagination.current, searchField);
    } else {
      const res = { ...data, id: current.id };
      await updateFactor(res, pagination.current, searchField);
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
            current={current.formFactorSD}
            nameField="formFactorSD"
            desc="Форм-фактор storage device"
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
            disabled={Object.keys(errors) > 0}
          >
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

FormFactorSDDialog.propTypes = {
  searchField: PropTypes.string,
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
    formFactorSD: PropTypes.string,
  }),
  setErrorMessage: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addFactor: PropTypes.func.isRequired,
  updateFactor: PropTypes.func.isRequired,
};

FormFactorSDDialog.defaultProps = {
  step: true,
  searchField: "",
  current: {
    id: undefined,
    formFactorSD: undefined,
  },
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.formFactorSDVisibility,
  pagination: state.formFactorSd.pagination,
  searchField: state.formFactorSd.searchField,
  current: state.formFactorSd.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setFormFactorSDVisibility,
  addFactor: addFactorSD,
  updateFactor: updateFactorSD,
})(FormFactorSDDialog);
