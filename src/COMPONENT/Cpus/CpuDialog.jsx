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
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import VendorSM from "../Common/Scroll/VendorSM";
import { setCpuVisibility } from "../../BLL/modalWindowReducer";
import CpuSocketSM from "../Common/Scroll/CpuSocketSM";
import { setError, setBackEndMessage } from "../../BLL/cpuReducer";

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
    visibility,
    current,
    operation,
    setErrorCode,
    setErrorMessage,
  } = props;

  const { handleSubmit, reset, control, errors } = useForm();

  const onClose = () => {
    setErrorCode(null);
    setErrorMessage("");
    setVisibilityCpu(false);
  };

  const onSubmit = async (data) => {
    await operation(data);
    setVisibilityCpu(false);
  };

  return (
    <Dialog open={visibility} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить процессор</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <VendorSM control={control} />
            </Box>
            <Box>
              <IconButton className={classes.butonArea}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
          <Controller
            as={
              <TextField
                fullWidth
                variant="outlined"
                placeholder="model"
                margin="dense"
                label="Model"
                error={!!errors.model}
              />
            }
            name="model"
            control={control}
            rules={{ required: true }}
            defaultValue={current.model || ""}
          />
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <CpuSocketSM control={control} />
            </Box>
            <Box>
              <IconButton className={classes.butonArea}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
          {errors.model && "Model is required"}
        </DialogContent>
        <DialogActions>
          <Button
            type="reset"
            color="primary"
            onClick={() => {
              reset({ model: "", vendor: "" });
              setVisibilityCpu(false);
            }}
          >
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CpuDialog.propTypes = {
  setVisibilityCpu: PropTypes.func.isRequired,
  operation: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  visibility: state.modalWindow.cpuVisibility,
  current: state.cpu.currentCpu,
});

export default connect(mapStateToProps, {
  setVisibilityCpu: setCpuVisibility,
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
})(CpuDialog);
