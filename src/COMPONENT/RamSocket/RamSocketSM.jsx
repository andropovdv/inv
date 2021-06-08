/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { getAllTypeOfRam } from "../../BLL/typeOfRamReducer";

const RamSocketSM = (props) => {
  const { current, isLoading, control, socketRamSC, getSocketRam } = props;

  React.useEffect(() => getSocketRam(), []);

  return (
    <>
      {socketRamSC.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Controller
          as={
            <Select
              id="labelSocketRam"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
              label="Разъем памяти"
              defaultValue={current.socketRam || socketRamSC[0].socketRam}
            >
              {socketRamSC.map((e) => (
                <MenuItem key={e.id} value={e.socketRam}>
                  {e.socketRam}
                </MenuItem>
              ))}
            </Select>
          }
          name="socketRam"
          control={control}
          defaultValue={current.socketRam || socketRamSC[0].socketRam}
        />
      )}
    </>
  );
};

RamSocketSM.propTypes = {
  socketRamSC: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketRam: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getSocketRam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socketRamSC: state.typeOfRam.typeOfRamAll,
  isLoading: state.typeOfRam.isLoading,
});

export default connect(mapStateToProps, {
  getSocketRam: getAllTypeOfRam,
})(RamSocketSM);
