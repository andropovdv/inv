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
  FormControl,
  FormControlLabel,
  Checkbox,
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
  textField: {
    marginTop: theme.spacing(1),
  },
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
      const res = { ...data, id: currentGlobal.id };
      await updateCpu(res, pagination.current, searchField);
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

  // FIXME
  // Failed prop type: Invalid prop `currentGlobal.freq` of type `number`
  // supplied to `CpuDialog`, expected `string`.

  return (
    <Dialog open={modal.visibility} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{modal.header}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Model */}
          <Controller
            name="model"
            control={control}
            rules={{
              required: "Обязательное",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={currentGlobal.model || ""}
            as={
              <TextField
                autoFocus
                fullWidth
                className={classes.textField}
                id="modelInput"
                variant="outlined"
                size="small"
                error={!!errors.model}
                label={errors.model ? errors.model.message : "Модель"}
                InputLabelProps={{ shrink: true }}
              />
            }
          />
          {/* Vendors */}
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.textField}
          >
            <Box display="flex" alignItems="flex-end">
              <Box flexGrow={1}>
                <InputLabel id="labelVendor">Производитель</InputLabel>
                <VendorSM control={control} current={currentGlobal} />
              </Box>
              <Box alignItems="flex-end">
                <IconButton className={classes.button} onClick={clickVendor}>
                  <AddBoxIcon color="primary" fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </FormControl>
          {/* Freq */}
          <Controller
            name="freq"
            control={control}
            rules={{
              required: "Обязательно",
              minLength: { value: 2, message: "Короткое" },
            }}
            defaultValue={currentGlobal.freq || ""}
            as={
              <TextField
                // id="freq"
                type="number"
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                error={!!errors.model}
                label={errors.freq ? errors.freq.message : "Частота"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">MHz</InputAdornment>
                  ),
                }}
              />
            }
          />
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.textField}
          >
            <Box display="flex" alignItems="flex-end">
              <Box flexGrow={1}>
                <InputLabel id="socketCpu">Разъем процессора</InputLabel>
                <CpuSocketSM control={control} current={currentGlobal} />
              </Box>
              <Box>
                <IconButton className={classes.button} onClick={clickSocket}>
                  <AddBoxIcon color="primary" fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </FormControl>
          {/* Graph kernel */}
          <Controller
            name="graphKernel"
            control={control}
            defaultValue={currentGlobal.graphKernel || false}
            render={({ onChange }) => (
              <FormControl>
                <FormControlLabel
                  label="Графическое ядро"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      defaultChecked={currentGlobal.graphKernel || false}
                      color="primary"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                />
              </FormControl>
            )}
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
  setVisibilitySocket: setCpuSoketVisibility,
  setVisibilityVendor: setVendorVisibility,
  addCpu: addCpusData,
  updateCpu: updateCpusData,
})(CpuDialog);
