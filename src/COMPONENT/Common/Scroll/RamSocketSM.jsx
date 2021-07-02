/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import RamSocketDialog from "../../RamSocket/RamSocketDialog";
import { getAllTypeOfRam } from "../../../BLL/typeOfRamReducer";
import { setTypeOfRamVisibility } from "../../../BLL/modalWindowReducer";

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

const RamSocketSM = (props) => {
  const {
    current,
    isLoading,
    socketRamSC,
    getSocketRam,
    control,
    setVisibilityRamSocket,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocketRam();
  }, []);

  const handleSocketRam = () => {
    setVisibilityRamSocket({
      type: true,
      header: "Добавить разъем RAM",
      visibility: true,
    });
  };

  return (
    <>
      {socketRamSC.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <RamSocketDialog step={false} />
          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <Controller
                name="socketRam"
                control={control}
                defaultValue={current.socketRam || socketRamSC[0].socketRam}
                render={({ onChange, value }) => (
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    >
                      <InputLabel shrink id="labelSocketRam">
                        Разъем оперативной памяти
                      </InputLabel>
                      <Select
                        labelId="labelSocketRam"
                        disabled={isLoading}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="Разъем оперативной памяти"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {socketRamSC.map((e) => (
                          <MenuItem key={e.id} value={e.socketRam}>
                            {e.socketRam}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
            </Box>
            <Box alignItems="flex-end">
              <IconButton className={classes.button} onClick={handleSocketRam}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

RamSocketSM.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
  getSocketRam: PropTypes.func.isRequired,
  setVisibilityRamSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socketRamSC: state.typeOfRam.typeOfRamAll,
  isLoading: state.typeOfRam.isLoading,
});

export default connect(mapStateToProps, {
  getSocketRam: getAllTypeOfRam,
  setVisibilityRamSocket: setTypeOfRamVisibility,
})(RamSocketSM);
