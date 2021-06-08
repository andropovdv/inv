/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Controller, useForm } from "react-hook-form";
import {
  addMboardData,
  setBackEndMessage,
  setError,
  updateMboardData,
} from "../../BLL/mboardReducer";
import {
  setCpuSoketVisibility,
  setFormFactorVisibility,
  setMboardVisibility,
  setTypeOfGraphSlotVisibility,
  setTypeOfRamVisibility,
  setVendorVisibility,
} from "../../BLL/modalWindowReducer";
import VendorSM from "../Common/Scroll/VendorSM";
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";
import RamSocketSM from "../RamSocket/RamSocketSM";
import GraphSocketSM from "../GraphSocket/GraphSocketSM";
import FormFactorSM from "../FormFactor/FormFactorSM";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    left: "53%",
    top: "53%",
    transform: "translate(-53%, -53%)",
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: "1.1876 em",
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
  },
}));

const MBoardDialog = (props) => {
  const {
    searchField,
    pagination,
    current,
    step,
    modal,
    setErrorCode,
    setErrorMessage,
    setVisibility,
    addMboard,
    updateMboard,
    setVisibilityVendor,
    setVisibilityCpuSocket,
    setVisibilityRamSocket,
    setVisibilityFormFactor,
    setVisibilityGraphSocket,
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
      await addMboard(data, pagination.current, searchField);
    } else {
      const res = { ...data, id: current.id };
      await updateMboard(res, pagination.current, searchField);
    }
    setVisibility({ type: false, header: "", visibility: false });
  };

  const handleVendor = () => {
    setVisibilityVendor({
      type: true,
      header: "Добавить производителя",
      visibility: true,
    });
  };

  const handletSocketCpu = () => {
    setVisibilityCpuSocket({
      type: true,
      header: "Добавить разъем CPU",
      visibility: true,
    });
  };

  const handleSocketRam = () => {
    setVisibilityRamSocket({
      type: true,
      header: "Добавить разъем RAM",
      visibility: true,
    });
  };

  const handleFormFactor = () => {
    setVisibilityFormFactor({
      type: true,
      header: "Добавить форм-фактор",
      visibility: true,
    });
  };

  const handleSocketGraph = () => {
    setVisibilityGraphSocket({
      type: true,
      header: "Добавить разъем видео карты",
      visibility: true,
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
              {/* Модель */}
              <Controller
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="model"
                control={control}
                rules={{
                  required: "Обязательное",
                  minLength: { value: 2, message: "Короткое" },
                }}
                defaultValue={current.model || ""}
              />
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              {/* производители */}
              <FormControl variant="outlined" fullWidth>
                <Box display="flex" alignItems="flex-end">
                  <Box flexGrow={1}>
                    <InputLabel id="labelVendor">Производитель</InputLabel>
                    <VendorSM control={control} current={current} />
                  </Box>
                  <Box alignItems="flex-end">
                    <IconButton
                      className={classes.button}
                      onClick={handleVendor}
                    >
                      <AddBoxIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </FormControl>
              {/* Cpu Socket */}
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
              >
                <Box display="flex" alignItems="flex-end">
                  <Box flexGrow={1}>
                    <InputLabel id="socketCpu">Разъем процессора</InputLabel>
                    <CpuSocketSM control={control} current={current} />
                  </Box>
                  <Box alignItems="flex-end">
                    <IconButton
                      className={classes.button}
                      onClick={handletSocketCpu}
                    >
                      <AddBoxIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </FormControl>
              {/* Ram Socket */}
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
              >
                <Box display="flex" alignItems="flex-end">
                  <Box flexGrow={1}>
                    <InputLabel id="labelSocketRam">Разъем памяти</InputLabel>
                    <RamSocketSM control={control} current={current} />
                  </Box>
                  <Box alignItems="flex-end">
                    <IconButton
                      className={classes.button}
                      onClick={handleSocketRam}
                    >
                      <AddBoxIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </FormControl>
              {/* SocketGraph */}
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
              >
                <Box display="flex" alignItems="flex-end">
                  <Box flexGrow={1}>
                    <InputLabel id="labelSocketGraph">
                      Разъем видео карты
                    </InputLabel>
                    <GraphSocketSM control={control} current={current} />
                  </Box>
                  <Box alignItems="flex-end">
                    <IconButton
                      className={classes.button}
                      onClick={handleSocketGraph}
                    >
                      <AddBoxIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </FormControl>
              {/* FormFactor */}
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
              >
                <Box display="flex" alignItems="flex-end">
                  <Box flexGrow={1}>
                    <InputLabel id="labelFormFactor">Форм Фактор</InputLabel>
                    <FormFactorSM control={control} current={current} />
                  </Box>
                  <Box alignItems="flex-end">
                    <IconButton
                      className={classes.button}
                      onClick={handleFormFactor}
                    >
                      <AddBoxIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              {/* quantitySocketRam */}
              <Controller
                as={
                  <TextField
                    fullWidth
                    type="number"
                    // className={classes.textField}
                    id="quantitySocketRam"
                    variant="outlined"
                    size="small"
                    error={!!errors.quantitySocketRam}
                    label={
                      errors.quantitySocketRam
                        ? errors.quantitySocketRam.message
                        : "Кол-во слотов RAM"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="quantitySocketRam"
                control={control}
                rules={{
                  required: "Обязательное",
                  min: { value: 0, message: "проверьте количество" },
                  max: { value: 10, message: "проверьте количество" },
                }}
                defaultValue={current.quantitySocketRam || 0}
              />
              {/* quantityPCI */}
              <Controller
                as={
                  <TextField
                    fullWidth
                    type="number"
                    className={classes.textField}
                    id="quantityPCI"
                    variant="outlined"
                    size="small"
                    error={!!errors.quantityPCI}
                    label={
                      errors.quantityPCI
                        ? errors.quantityPCI.message
                        : "Кол-во слотов PCI"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="quantityPCI"
                control={control}
                rules={{
                  required: "Обязательное",
                  min: { value: 0, message: "проверьте количество" },
                  max: { value: 10, message: "проверьте количество" },
                }}
                defaultValue={current.quantityPCI || 0}
              />
              {/* quantityPCIE */}
              <Controller
                as={
                  <TextField
                    fullWidth
                    type="number"
                    className={classes.textField}
                    id="quantityPCIE"
                    variant="outlined"
                    size="small"
                    error={!!errors.quantityPCIE}
                    label={
                      errors.quantityPCIE
                        ? errors.quantityPCIE.message
                        : "Кол-во слотов PCI Express"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="quantityPCIE"
                control={control}
                rules={{
                  required: "Обязательное",
                  min: { value: 0, message: "проверьте количество" },
                  max: { value: 10, message: "проверьте количество" },
                }}
                defaultValue={current.quantityPCIE || 0}
              />
              {/* quantityIDE */}
              <Controller
                as={
                  <TextField
                    fullWidth
                    type="number"
                    className={classes.textField}
                    id="quantityIDE"
                    variant="outlined"
                    size="small"
                    error={!!errors.quantityIDE}
                    label={
                      errors.quantityIDE
                        ? errors.quantityIDE.message
                        : "Кол-во слотов IDE"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="quantityIDE"
                control={control}
                rules={{
                  required: "Обязательное",
                  min: { value: 0, message: "проверьте количество" },
                  max: { value: 10, message: "проверьте количество" },
                }}
                defaultValue={current.quantityIDE || 0}
              />
              {/* quantitySATA */}
              <Controller
                as={
                  <TextField
                    fullWidth
                    type="number"
                    className={classes.textField}
                    id="quantitySATA"
                    variant="outlined"
                    size="small"
                    error={!!errors.quantitySATA}
                    label={
                      errors.quantitySATA
                        ? errors.quantitySATA.message
                        : "Кол-во слотов SATA"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                name="quantitySATA"
                control={control}
                rules={{
                  required: "Обязательное",
                  min: { value: 0, message: "проверьте количество" },
                  max: { value: 10, message: "проверьте количество" },
                }}
                defaultValue={current.quantitySATA || 0}
              />
            </Grid>
            <Grid item xs={12} className={classes.paper}>
              <Box display="flex">
                <Box flexGrow={0.33} textAlign="center">
                  {/* intGraph */}
                  <Controller
                    name="intGraph"
                    control={control}
                    defaultValue={current.intGraph || false}
                    render={({ onChange }) => (
                      <FormControl>
                        <FormControlLabel
                          label="Встроенная графика"
                          labelPlacement="end"
                          control={
                            <Checkbox
                              defaultChecked={current.intGraph || false}
                              color="primary"
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          }
                        />
                      </FormControl>
                    )}
                  />
                </Box>
                <Box flexGrow={0.33} textAlign="center">
                  {/* intSound */}
                  <Controller
                    name="intSound"
                    control={control}
                    defaultValue={current.intSound || false}
                    render={({ onChange }) => (
                      <FormControl>
                        <FormControlLabel
                          label="Встроенная звуковая карта"
                          labelPlacement="end"
                          control={
                            <Checkbox
                              defaultChecked={current.intSound || false}
                              color="primary"
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          }
                        />
                      </FormControl>
                    )}
                  />
                </Box>
                <Box flexGrow={0.33} textAlign="center">
                  {/* intLan */}
                  <Controller
                    name="intLAN"
                    control={control}
                    defaultValue={current.intLAN || false}
                    render={({ onChange }) => (
                      <FormControl>
                        <FormControlLabel
                          label="Встроенная сетевая карта"
                          labelPlacement="end"
                          control={
                            <Checkbox
                              defaultChecked={current.intLAN || false}
                              color="primary"
                              onChange={(e) => onChange(e.target.checked)}
                            />
                          }
                        />
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.actionButton}>
          <Button color="primary" onClick={onClose} variant="outlined">
            Отмера
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

MBoardDialog.propTypes = {
  searchField: PropTypes.string.isRequired,
  step: PropTypes.bool.isRequired,
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
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketRam: PropTypes.string,
    intGraph: PropTypes.bool,
    quantitySocketRam: PropTypes.number,
    socketGraph: PropTypes.string,
    quantityPCI: PropTypes.number,
    quantityPCIE: PropTypes.number,
    quantityIDE: PropTypes.number,
    quantitySATA: PropTypes.number,
    formFactor: PropTypes.string,
    intLAN: PropTypes.bool,
    intSound: PropTypes.bool,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  addMboard: PropTypes.func.isRequired,
  updateMboard: PropTypes.func.isRequired,
  setVisibilityVendor: PropTypes.func.isRequired,
  setVisibilityCpuSocket: PropTypes.func.isRequired,
  setVisibilityRamSocket: PropTypes.func.isRequired,
  setVisibilityFormFactor: PropTypes.func.isRequired,
  setVisibilityGraphSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modalWindow.mboardVisibility,
  current: state.mboard.current,
  pagination: state.mboard.pagination,
  searchField: state.mboard.searchField,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setVisibility: setMboardVisibility,
  addMboard: addMboardData,
  updateMboard: updateMboardData,
  setVisibilityVendor: setVendorVisibility,
  setVisibilityCpuSocket: setCpuSoketVisibility,
  setVisibilityRamSocket: setTypeOfRamVisibility,
  setVisibilityFormFactor: setFormFactorVisibility,
  setVisibilityGraphSocket: setTypeOfGraphSlotVisibility,
})(MBoardDialog);
