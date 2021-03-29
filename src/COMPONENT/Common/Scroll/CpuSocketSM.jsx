/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Controller } from "react-hook-form";
import { MenuItem, Select } from "@material-ui/core";
import { getAllSocketCpuData } from "../../../BLL/typeSocketCpuReducer";

const CpuSocketSM = (props) => {
  const { isLoading, cpuSocketsAll, getSocketCpu, control } = props;

  React.useEffect(() => {
    getSocketCpu();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <Controller
          as={
            <Select
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
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
          defaultValue={cpuSocketsAll[0].label} // FIXME поправить
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
  getSocketCpu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cpuSocketsAll: state.typeCpuSocket.cpuSocketsAll,
  isLoading: state.typeCpuSocket.isLoading,
});

export default connect(mapStateToProps, { getSocketCpu: getAllSocketCpuData })(
  CpuSocketSM
);
