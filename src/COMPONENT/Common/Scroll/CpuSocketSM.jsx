/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllSocketCpuData } from "../../../BLL/typeSocketCpuReducer";
import { setCpuSoketVisibility } from "../../../BLL/modalWindowReducer";
import CpuSocketDialog from "../../CpuSocket/CpuSocketDialog";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(1),
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

const CpuSocketSM = (props) => {
  const { sockets, current, getSocketCpu, setVisibility, control } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocketCpu();
  }, []);

  const clickSocketCpu = () => {
    setVisibility({
      type: true,
      header: "Добавить разъем процессора",
      visibility: true,
    });
  };

  const mapsField = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.socketCpu;
      return row;
    });
    return newRows;
  };

  const socketOption = mapsField(sockets);
  socketOption.push("");

  const loading = socketOption.length === 0;

  return (
    <>
      {sockets.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <CpuSocketDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="socketCpu"
                control={control}
                defaultValue={current.socketCpu || socketOption[0]}
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
                    value={current.socketCpu || socketOption[0]}
                    // defaultValue={current.socketCpu || socketOption[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickSocketCpu()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Разъем процессора"
                        variant="outlined"
                        // margin="dense"
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
              <IconButton className={classes.button} onClick={clickSocketCpu}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

CpuSocketSM.propTypes = {
  getSocketCpu: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  sockets: state.typeCpuSocket.cpuSocketsAll,
});

export default connect(mapStateToProps, {
  getSocketCpu: getAllSocketCpuData,
  setVisibility: setCpuSoketVisibility,
})(CpuSocketSM);
