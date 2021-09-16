import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setStorageDeviceVisibility } from "../../BLL/modalWindowReducer";
import {
  addStorageDevice,
  updateStorageDevice,
} from "../../BLL/storageDeviceReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import VendorSM from "../Common/Scroll/VendorSM";
import FormFactorSDSM from "../FormFactorSD/FormFactorSDSM";
import SdSocketSM from "../SdSocket/SdSocketSM";

const useStyles = makeStyles((theme) => ({
  dialog: {
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

const StorageDeviceDialog = (props) => {
  const {
    step,
    current,
    searchField,
    pagination,
    modal,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    addStorage,
    updateStorage,
  } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm({ mode: "onChange" });

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
      await addStorage(data, pagination.current, searchField);
    } else {
      const res = { ...data, id: current.id };
      await updateStorage(res, pagination.current, searchField);
    }
    setVisibility({
      type: false,
      header: "",
      visibility: false,
    });
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
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.paper}>
              <TextFieldSM
                control={control}
                current={current.model}
                errors={errors}
                nameField="model"
                desc="Модель"
              />
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              <VendorSM control={control} current={current} />
              <SdSocketSM control={control} current={current} />
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              <FormFactorSDSM control={control} current={current} />
              <TextFieldSM
                control={control}
                current={current.volume}
                errors={errors}
                nameField="volume"
                desc="Объем"
              />
            </Grid>
          </Grid>
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

StorageDeviceDialog.propTypes = {
  step: PropTypes.bool,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    volume: PropTypes.number,
    socket: PropTypes.string,
    formFactor: PropTypes.string,
  }),
  searchField: PropTypes.string,
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
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addStorage: PropTypes.func.isRequired,
  updateStorage: PropTypes.func.isRequired,
};

StorageDeviceDialog.defaultProps = {
  step: true,
  searchField: "",
  current: {
    id: undefined,
    vendor: undefined,
    model: undefined,
    socket: undefined,
    formFactor: undefined,
  },
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.storageDeviceVisibility,
  pagination: state.storageDevice.pagination,
  searchField: state.storageDevice.searchField,
  current: state.storageDevice.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setStorageDeviceVisibility,
  addStorage: addStorageDevice,
  updateStorage: updateStorageDevice,
})(StorageDeviceDialog);
