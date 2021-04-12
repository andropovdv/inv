/* eslint-disable react/jsx-wrap-multilines */
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  InputLabel,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { connect } from "react-redux";
import VendorSM from "../Common/Scroll/VendorSM";
import {
  setCpuSoketVisibility,
  setCpuVisibility,
} from "../../BLL/modalWindowReducer";
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";
import {
  setError,
  setBackEndMessage,
  addCpusData,
  updateCpusData,
} from "../../BLL/cpuReducer";

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
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(1),
  },
}));

const CpuDialog = (props) => {
  const classes = useStyles();
  const {
    setVisibilityCpu,
    modal,
    currentGlobal,
    setErrorCode,
    setErrorMessage,
    setVisibilitySocket,
    addCpu,
    updateCpu,
  } = props;

  const { handleSubmit, control, errors } = useForm();

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibilityCpu({ type: false, header: "", visibility: false });
  };

  const onSubmit = async (data) => {
    if (modal.type) {
      await addCpu(data);
    } else {
      const req = {
        id: currentGlobal.id,
        name: data.vendor,
        model: data.model,
        socketCpu: data.socket,
      };
      await updateCpu(req);
    }
    setVisibilityCpu({ type: false, header: "", visibility: false });
  };

  const clickSocket = () => {
    setVisibilitySocket({
      type: true,
      header: "Добавить разъем",
      visibility: true,
    });
  };

  return (
    <Dialog open={modal.visibility} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{modal.header}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <InputLabel id="labelVendor">Производитель</InputLabel>
              <VendorSM control={control} />
            </Box>
            <Box>
              <IconButton className={classes.butonArea}>
                <AddBoxIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <InputLabel id="modelInput">Модель</InputLabel>
          <Controller
            as={
              // <>
              <TextField
                id="modelModel"
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!errors.model}
                // defaultValue={current.model || ""}
              />
              // </>
            }
            name="model"
            control={control}
            rules={{ required: true }}
            defaultValue={currentGlobal.model || ""}
          />
          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <InputLabel id="socketCpu">Разъем процессора</InputLabel>
              <CpuSocketSM control={control} />
            </Box>
            <Box>
              <IconButton className={classes.butonArea} onClick={clickSocket}>
                <AddBoxIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          {errors.model && "Model is required"}
        </DialogContent>
        <DialogActions>
          <Button type="reset" color="primary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CpuDialog.propTypes = {
  setVisibilityCpu: PropTypes.func.isRequired,
  currentGlobal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibilitySocket: PropTypes.func.isRequired,
  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  addCpu: PropTypes.func.isRequired,
  updateCpu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.cpuVisibility,
  currentGlobal: state.cpu.currentCpu,
});

export default connect(mapStateToProps, {
  setVisibilityCpu: setCpuVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibilitySocket: setCpuSoketVisibility,
  addCpu: addCpusData,
  updateCpu: updateCpusData,
})(CpuDialog);
