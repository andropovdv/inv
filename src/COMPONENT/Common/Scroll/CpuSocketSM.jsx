/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Controller } from "react-hook-form";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { getAllSocketCpuData } from "../../../BLL/typeSocketCpuReducer";

const CpuSocketSM = (props) => {
  const { isLoading, getSocketAllCpu, cpuSocketsAll, control, current } = props;

  React.useEffect(() => {
    getSocketAllCpu();
  }, []);

  return (
    <>
      {cpuSocketsAll.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Controller
          as={
            <Select
              displayEmpty
              id="socketCpu"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
              // defaultValue={value}
              defaultValue={current.socketCpu || cpuSocketsAll[0].label}
            >
              {cpuSocketsAll.map((e) => (
                <MenuItem key={e.id} value={e.label}>
                  {e.label}
                </MenuItem>
              ))}
            </Select>
          }
          name="socket"
          control={control}
          // defaultValue={value}
          defaultValue={current.socketCpu || cpuSocketsAll[0].label}
        />
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
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
  getSocketAllCpu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cpuSocketsAll: state.typeCpuSocket.cpuSocketsAll,
  isLoading: state.typeCpuSocket.isLoading,
  current: state.cpu.currentCpu,
});

export default connect(mapStateToProps, {
  getSocketAllCpu: getAllSocketCpuData,
})(CpuSocketSM);
