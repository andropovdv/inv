/* eslint-disable react/jsx-wrap-multilines */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  addVendorData,
  setBackEndMessage,
  setError,
  updateVendorData,
} from "../../BLL/vendorReducer";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    minWidth: 320,
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  bottonArea: {
    display: "flex",
    padding: 0,
  },
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

const VendorDialog = (props) => {
  const classes = useStyles();

  const {
    step,
    modal,
    current,
    searchField,
    pagination,

    setErrorCode,
    setErrorMessage,
    setVisibility,
    addVendor,
    updateVendor,
  } = props;

  const { handleSubmit, control, errors } = useForm();

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibility({ type: false, header: "", visibility: false });
  };

  const onSubmit = (data) => {
    if (modal.type) {
      addVendor(data, pagination.current, searchField);
    } else {
      const upVendor = {
        id: current.id,
        vendor: data.vendor,
        full: data.full,
        url: data.url,
      };
      updateVendor(upVendor, pagination.current, searchField);
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
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="dense"
                label={errors.name ? errors.name.message : "Наименование"}
                error={!!errors.name}
              />
            }
            name="vendor"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={current.vendor || ""}
          />
          <Controller
            as={
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                label="Полное наименование"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.full}
              />
            }
            name="full"
            control={control}
            defaultValue={current.full || ""}
          />
          <Controller
            as={
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                label="Сайт"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.url}
              />
            }
            name="url"
            control={control}
            defaultValue={current.url || ""}
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмера
          </Button>
          <Button color="secondary" type="submit" variant="outlined">
            Записать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

VendorDialog.propTypes = {
  step: PropTypes.bool,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }),

  searchField: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,

  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addVendor: PropTypes.func.isRequired,
  updateVendor: PropTypes.func.isRequired,
};

VendorDialog.defaultProps = {
  current: {
    id: undefined,
    vendor: undefined,
    full: undefined,
    url: undefined,
  },
  step: true,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.vendorVisibility,
  searchField: state.vendor.searchField,
  pagination: state.vendor.pagination,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setVendorVisibility,
  addVendor: addVendorData,
  updateVendor: updateVendorData,
})(VendorDialog);
