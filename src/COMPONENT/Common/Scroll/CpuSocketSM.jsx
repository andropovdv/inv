/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllSocketCpuData } from "../../../BLL/typeSocketCpuReducer";
import { setCpuSoketVisibility } from "../../../BLL/modalWindowReducer";
import CpuSocketDialog from "../../CpuSocket/CpuSocketDialog";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: "1.1876 em",
  },
}));

const CpuSocketSM = (props) => {
  const {
    isLoading,
    cpuSocketsAll,
    control,
    current,
    setVisibilitySocket,
    getSocketAllCpu,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocketAllCpu();
  }, []);

  const clickSocket = () => {
    setVisibilitySocket({
      type: true,
      header: "Добавить разъем",
      visibility: true,
    });
  };

  return (
    <>
      {cpuSocketsAll.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Box display="flex" alignItems="flex-end">
          <Box flexGrow={1}>
            <CpuSocketDialog step={false} />

            <Controller
              name="socketCpu"
              control={control}
              defaultValue={current.socketCpu || cpuSocketsAll[0].label}
              render={({ onChange, value }) => (
                <>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  >
                    <InputLabel shrink id="socketCpu">
                      Разъем процессора
                    </InputLabel>
                    <Select
                      labelId="socketCpu"
                      disabled={isLoading}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Разъем процессора"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    >
                      {cpuSocketsAll.map((e) => (
                        <MenuItem key={e.id} value={e.label}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </Box>
          <Box alignItems="flex-end">
            <IconButton className={classes.button} onClick={clickSocket}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

CpuSocketSM.propTypes = {
  cpuSocketsAll: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
  getSocketAllCpu: PropTypes.func.isRequired,
  setVisibilitySocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cpuSocketsAll: state.typeCpuSocket.cpuSocketsAll,
  isLoading: state.typeCpuSocket.isLoading,
});

export default connect(mapStateToProps, {
  getSocketAllCpu: getAllSocketCpuData,
  setVisibilitySocket: setCpuSoketVisibility,
})(CpuSocketSM);
