/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getAllTypeOfRam } from "../../../BLL/typeOfRamReducer";
import { setTypeOfRamVisibility } from "../../../BLL/modalWindowReducer";
import RamSocketDialog from "../../RamSocket/RamSocketDialog";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    display: "inline-block",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    minHeight: "1.1875 em",
  },
}));

const RamSocketSM = (props) => {
  // eslint-disable-next-line react/prop-types
  const { current, socket, getSocket, setVisibility, control } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocket();
  }, []);

  const clickSocketRam = () => {
    setVisibility({
      type: true,
      header: "Добавить разъем RAM",
      visibility: true,
    });
  };

  const mapsField = (soc) => {
    const newRows = soc.map((e) => {
      let row = [];
      row = e.socketRam;
      return row;
    });
    return newRows;
  };

  const socketOption = mapsField(socket);

  socketOption.push("");

  const loading = socketOption.length === 0;

  return (
    <>
      {socketOption.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <RamSocketDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="socketRam"
                control={control}
                defaultValue={current.socketRam || socketOption[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={socketOption}
                    fullWidth
                    getOptionLabel={(options) => options}
                    value={current.socketRam || socketOption[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickSocketRam()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Разъем RAM"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box alignItems="flex-end">
              <IconButton className={classes.button} onClick={clickSocketRam}>
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
  getSocket: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  socket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketRam: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  socket: state.typeOfRam.typeOfRamAll,
  current: state.typeOfRam.currentType,
});

export default connect(mapStateToProps, {
  getSocket: getAllTypeOfRam,
  setVisibility: setTypeOfRamVisibility,
})(RamSocketSM);
