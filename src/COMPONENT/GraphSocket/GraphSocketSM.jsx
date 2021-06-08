/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { getAllTypeOfGraphSlot } from "../../BLL/typeOfGraphSlotReducer";

const GraphSocketSM = (props) => {
  const { isLoading, current, socketGraphSC, control, getSocketGraph } = props;

  React.useEffect(() => getSocketGraph(), []);

  return (
    <>
      {socketGraphSC.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Controller
          name="socketGraph"
          control={control}
          defaultValue={current.socketGraph || socketGraphSC[0].socketGraph}
          as={
            <Select
              id="labelSocketGraph"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
              label="Разъем видео карты"
              defaultValue={current.socketGraph || socketGraphSC[0].socketGraph}
            >
              {socketGraphSC.map((e) => (
                <MenuItem key={e.id} value={e.socketGraph}>
                  {e.socketGraph}
                </MenuItem>
              ))}
            </Select>
          }
        />
      )}
    </>
  );
};

GraphSocketSM.propTypes = {
  socketGraphSC: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketGraph: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
  getSocketGraph: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socketGraphSC: state.typeOfGraphSlot.typeAllOfGraphSlot,
  isLoading: state.typeOfGraphSlot.isLoading,
});

export default connect(mapStateToProps, {
  getSocketGraph: getAllTypeOfGraphSlot,
})(GraphSocketSM);
