import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addVendorData, updateVendorData } from "../../BLL/vendorReducer";
import { setError, setBackEndMessage } from "../../BLL/errorReducer";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import TextFieldRM from "../Common/Scroll/TextFieldRM";

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
          {/* Vendor */}
          <TextFieldSM
            control={control}
            errors={errors}
            current={current.vendor}
            nameField="vendor"
            desc="Наименование"
          />
          {/* Full Vendor */}
          <TextFieldRM
            control={control}
            errors={errors}
            current={current.full}
            nameField="full"
            desc="Полное наименование"
          />
          <TextFieldRM
            control={control}
            errors={errors}
            current={current.full}
            nameField="url"
            desc="Сайт"
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

  searchField: PropTypes.string,
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
  searchField: "",
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
