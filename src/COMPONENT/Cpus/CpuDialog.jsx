/* eslint-disable react/jsx-wrap-multilines */
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
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import CheckBoxSM from "../Common/Scroll/CheckBoxSM";
import {
  setError,
  setBackEndMessage,
  addCpusData,
  updateCpusData,
} from "../../BLL/cpuReducer";

const useStyles = makeStyles(() => ({
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const CpuDialog = (props) => {
  const classes = useStyles();
  const {
    modal,
    currentGlobal,
    searchField,
    pagination,

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
    // FIXME подготовить данные формы для отправки
    if (modal.type) {
      await addCpu(data, pagination.current, searchField);
    } else {
      const res = {
        ...data,
        id: currentGlobal.id,
        freq: parseInt(data.freq, 10),
      };
      await updateCpu(res, pagination.current, searchField);
    }
    setVisibilityCpu({ type: false, header: "", visibility: false });
  };

  // FIXME
  // Failed prop type: Invalid prop `currentGlobal.freq` of type `number`
  // supplied to `CpuDialog`, expected `string`.

  return (
    <Dialog open={modal.visibility} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{modal.header}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextFieldSM
            control={control}
            current={currentGlobal.model}
            errors={errors}
            nameField="model"
            desc="Модель"
          />

          <VendorSM control={control} current={currentGlobal} />

          <TextFieldSM
            control={control}
            current={currentGlobal.freq}
            errors={errors}
            nameField="freq"
            num
            desc="Частота"
          />

          <CpuSocketSM control={control} current={currentGlobal} />

          <CheckBoxSM
            nameField="graphKernel"
            control={control}
            desc="Графическое ядро"
            current={currentGlobal.graphKernel}
          />
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмена
          </Button>
          <Button color="secondary" type="submit" variant="outlined">
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

  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  currentGlobal: PropTypes.shape({
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

const mapStateToProps = (state) => ({
  modal: state.modalWindow.cpuVisibility,
  currentGlobal: state.cpu.currentCpu,
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
