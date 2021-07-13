/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import TextFieldSM from "../Common/Scroll/TextFieldSM";
import CheckBoxSM from "../Common/Scroll/CheckBoxSM";
import {
  addMboardData,
  // setBackEndMessage,
  // setError,
  updateMboardData,
} from "../../BLL/mboardReducer";
import { setBackEndMessage, setError } from "../../BLL/errorReducer";
import { setMboardVisibility } from "../../BLL/modalWindowReducer";
import VendorSM from "../Common/Scroll/VendorSM";
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";
import RamSocketSM from "../Common/Scroll/RamSocketSM";
import GraphSocketSM from "../Common/Scroll/GraphSocketSM";
import FormFactorSM from "../Common/Scroll/FormFactorSM";

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
      console.log("Data", data);
      await addMboard(data, pagination.current, searchField);
    } else {
      const res = {
        ...data,
        id: current.id,
      };
      await updateMboard(res, pagination.current, searchField);
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
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.paper}>
              {/* Модель */}
              <TextFieldSM
                control={control}
                current={current.model}
                errors={errors}
                nameField="model"
                desc="Модель"
              />
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              {/* производители */}
              <VendorSM control={control} current={current} />
              {/* Cpu Socket */}
              <CpuSocketSM control={control} current={current} />
              {/* Ram Socket */}
              <RamSocketSM control={control} current={current} />
              {/* SocketGraph */}
              <GraphSocketSM control={control} current={current} />
              {/* FormFactor */}
              <FormFactorSM control={control} current={current} />
            </Grid>
            <Grid item xs={6} className={classes.paper}>
              {/* quantitySocketRam */}
              <TextFieldSM
                control={control}
                errors={errors}
                current={current.quantitySocketRam}
                nameField="quantitySocketRam"
                desc="Кол-во слотов RAM"
                num
              />
              {/* quantityPCI */}
              <TextFieldSM
                control={control}
                errors={errors}
                current={current.quantityPCI}
                nameField="quantityPCI"
                desc="Кол-во слотов PCI"
                num
              />
              {/* quantityPCIE */}
              <TextFieldSM
                control={control}
                errors={errors}
                current={current.quantityPCIE}
                nameField="quantityPCIE"
                desc="Кол-во слотов PCIE"
                num
              />
              {/* quantityIDE */}
              <TextFieldSM
                control={control}
                errors={errors}
                current={current.quantityIDE}
                nameField="quantityIDE"
                desc="Кол-во слотов IDE"
                num
              />
              {/* quantitySATA */}
              <TextFieldSM
                control={control}
                errors={errors}
                current={current.quantitySATA}
                nameField="quantitySATA"
                desc="Кол-во слотов SATA"
                num
              />
            </Grid>
            <Grid item xs={12} className={classes.paper}>
              <Box display="flex">
                <Box flexGrow={0.33} textAlign="center">
                  {/* intGraph */}
                  <CheckBoxSM
                    control={control}
                    nameField="intGraph"
                    desc="Встроенная графика"
                    current={current.intGraph}
                  />
                </Box>
                <Box flexGrow={0.33} textAlign="center">
                  {/* intSound */}
                  <CheckBoxSM
                    control={control}
                    nameField="intSound"
                    desc="Встроенная звуковая карта"
                    current={current.intSound}
                  />
                </Box>
                <Box flexGrow={0.33} textAlign="center">
                  {/* intLan */}
                  <CheckBoxSM
                    control={control}
                    nameField="intLan"
                    desc="Встроенная звуковая карта"
                    current={current.intLAN}
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
})(MBoardDialog);
