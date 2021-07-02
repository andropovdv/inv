/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllTypeOfGraphSlot } from "../../../BLL/typeOfGraphSlotReducer";
import { setTypeOfGraphSlotVisibility } from "../../../BLL/modalWindowReducer";
import GraphSocketDialog from "../../GraphSocket/GraphSocketDialog";

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

const GraphSocketSM = (props) => {
  const {
    isLoading,
    socketGraphSC,
    control,
    current,
    getSocketGraph,
    setVisibilityGraphSocket,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocketGraph();
  }, []);

  const handleSocketGraph = () => {
    setVisibilityGraphSocket({
      type: true,
      header: "Добавить разъем видео карты",
      visibility: true,
    });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <GraphSocketDialog step={false} />

          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <Controller
                name="socketGraph"
                control={control}
                defaultValue={
                  current.socketGraph || socketGraphSC[0].socketGraph
                }
                render={({ onChange, value }) => (
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    >
                      <InputLabel shrink id="labelSocketGraph">
                        Разъем видеокарты
                      </InputLabel>
                      <Select
                        labelId="labelSocketGraph"
                        disabled={isLoading}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="Разъем видеокарты"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {socketGraphSC.map((e) => (
                          <MenuItem key={e.id} value={e.socketGraph}>
                            {e.socketGraph}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
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
        </>
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
  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
  getSocketGraph: PropTypes.func.isRequired,
  setVisibilityGraphSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socketGraphSC: state.typeOfGraphSlot.typeAllOfGraphSlot,
  isLoading: state.typeOfGraphSlot.isLoading,
});

export default connect(mapStateToProps, {
  getSocketGraph: getAllTypeOfGraphSlot,
  setVisibilityGraphSocket: setTypeOfGraphSlotVisibility,
})(GraphSocketSM);
