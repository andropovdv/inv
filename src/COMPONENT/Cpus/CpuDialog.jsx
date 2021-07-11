import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import VendorSM from "../Common/Scroll/VendorSM";
import { setCpuVisibility } from "../../BLL/modalWindowReducer";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import CheckBoxSM from "../Common/Scroll/CheckBoxSM";
import { addCpusData, updateCpusData } from "../../BLL/cpuReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";

const useStyles = makeStyles(() => ({
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
}));

const CpuDialog = (props) => {
  const classes = useStyles();
  const {
    modal,
    current,
    searchField,
    pagination,
    step,

    setVisibilityCpu,
    setErrorCode,
    setErrorMessage,
    addCpu,
    updateCpu,
  } = props;

  const { handleSubmit, control, errors } = useForm({ mode: "onChange" });

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibilityCpu({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addCpu(data, pagination.current, searchField);
    } else {
      const res = {
        ...data,
        id: current.id,
        freq: parseInt(data.freq, 10),
      };
      await updateCpu(res, pagination.current, searchField);
    }
    setVisibilityCpu({ type: false, header: "", visibility: false });
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
            current={current.model}
            errors={errors}
            nameField="model"
            desc="Модель"
          />

          <VendorSM control={control} current={current} />

          <TextFieldSM
            control={control}
            current={current.freq}
            errors={errors}
            nameField="freq"
            num
            desc="Частота"
          />

          <CpuSocketSM control={control} current={current} />

          <CheckBoxSM
            nameField="graphKernel"
            control={control}
            desc="Графическое ядро"
            current={current.graphKernel}
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

CpuDialog.propTypes = {
  setVisibilityCpu: PropTypes.func.isRequired,
  addCpu: PropTypes.func.isRequired,
  updateCpu: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,

  step: PropTypes.bool,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    freq: PropTypes.number,
    graphKernel: PropTypes.bool,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
};

CpuDialog.defaultProps = {
  step: true,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.cpuVisibility,
  current: state.cpu.currentCpu,
  pagination: state.cpu.pagination,
  searchField: state.cpu.searchField,
});

export default connect(mapStateToProps, {
  setVisibilityCpu: setCpuVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  addCpu: addCpusData,
  updateCpu: updateCpusData,
})(CpuDialog);
