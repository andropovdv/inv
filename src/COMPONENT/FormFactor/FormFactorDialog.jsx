/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { addFormFactor, updateFormFactor } from "../../BLL/formFactorReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setFormFactorVisibility } from "../../BLL/modalWindowReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const FormFactorDialog = (props) => {
  const {
    step,
    modal,
    pagination,
    current,
    searchField,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    addFactor,
    updateFactor,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  let location;
  if (!step) location = { paper: classes.dialog };

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
      await addFactor(data, pagination.current, searchField);
    } else {
      const upItem = { id: current.id, formFactor: data.formFactor };
      await updateFactor(upItem, pagination.current, searchField);
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
            current={current.formFactor}
            nameField="formFactor"
            desc="Форм-фактор"
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

FormFactorDialog.propTypes = {
  step: PropTypes.bool,
  searchField: PropTypes.string.isRequired,
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
    formFactor: PropTypes.string,
  }),
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addFactor: PropTypes.func.isRequired,
  updateFactor: PropTypes.func.isRequired,
};

FormFactorDialog.defaultProps = {
  step: true,
  current: {
    id: undefined,
    formFactor: undefined,
  },
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.formFactorVisibility,
  pagination: state.formFactor.pagination,
  searchField: state.formFactor.searchField,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setFormFactorVisibility,
  addFactor: addFormFactor,
  updateFactor: updateFormFactor,
})(FormFactorDialog);
