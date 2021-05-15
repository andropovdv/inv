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
  InputAdornment,
  Typography,
  Switch,
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
  setVendorVisibility,
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
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: "1.1876 em",
    // minWidth: 0,
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
    setVisibilitySocket,
    setVisibilityVendor,
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
      await addCpu(data, pagination.current, searchField);
    } else {
      const upCpu = {
        id: currentGlobal.id,
        name: data.vendor,
        model: data.model,
        socketCpu: data.socket,
        freq: data.freq,
      };
      await updateCpu(upCpu, pagination.current, searchField);
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

  const clickVendor = () => {
    setVisibilityVendor({
      type: true,
      header: "Добавить производителя",
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
            <Box alignItems="flex-end">
              <IconButton className={classes.button} onClick={clickVendor}>
                <AddBoxIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <InputLabel id="modelInput">Модель</InputLabel>
          <Controller
            as={
              <TextField
                id="modelModel"
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!errors.model}
                label={errors.model ? errors.model.message : null}
              />
            }
            name="model"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={currentGlobal.model || ""}
          />
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h6">Графическое ядро</Typography>
            </Box>
            <Box alignItems="flex-end">
              <Switch color="primary" />
            </Box>
          </Box>
          <InputLabel id="freq">Частота процессора</InputLabel>
          <Controller
            as={
              <TextField
                id="freq"
                type="number"
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!errors.freq}
                label={errors.freq ? errors.freq.message : null}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">MHz</InputAdornment>
                  ),
                }}
              />
            }
            name="freq"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 3, message: "Короткое" },
            }}
            defaultValue={currentGlobal.freq || ""}
          />
          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <InputLabel id="socketCpu">Разъем процессора</InputLabel>
              <CpuSocketSM control={control} />
            </Box>
            <Box>
              <IconButton className={classes.button} onClick={clickSocket}>
                <AddBoxIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
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
  setVisibilitySocket: PropTypes.func.isRequired,
  setVisibilityVendor: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,

  modal: PropTypes.shape({
    type: PropTypes.bool,
    header: PropTypes.string,
    visibility: PropTypes.bool,
  }).isRequired,
  currentGlobal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    freq: PropTypes.string,
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
  setVisibilitySocket: setCpuSoketVisibility,
  setVisibilityVendor: setVendorVisibility,
  addCpu: addCpusData,
  updateCpu: updateCpusData,
})(CpuDialog);
