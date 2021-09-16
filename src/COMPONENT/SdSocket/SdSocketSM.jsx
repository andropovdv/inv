/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Controller } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import { getAllSocketSd } from "../../BLL/typeOfSocketSdReducer";
import { setSocketSdVisibility } from "../../BLL/modalWindowReducer";
import SdSocketDialog from "./SdSocketDialog";

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

const SdSocketSM = (props) => {
  const {
    isLoading,
    current,
    socketSD,
    getSocketSd,
    setVisibility,
    control,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocketSd();
  }, []);

  const clickSocketSd = () => {
    setVisibility({
      type: true,
      header: "Добавить разъем SD",
      visibility: true,
    });
  };

  const mapFields = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.socket;
      return row;
    });
    return newRows;
  };

  const socketSDs = mapFields(socketSD);
  socketSDs.push("");

  const loading = socketSDs.length === 0;

  return (
    <>
      {isLoading || socketSDs.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <SdSocketDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="socket"
                control={control}
                defaultValue={current.socket || socketSDs[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={socketSDs}
                    fullWidth
                    getOptionLabel={(options) => options}
                    value={current.socket || socketSDs[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickSocketSd()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Разъем SD"
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
              <IconButton className={classes.button} onClick={clickSocketSd}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

SdSocketSM.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socket: PropTypes.string,
  }).isRequired,
  socketSD: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socket: PropTypes.string,
    })
  ).isRequired,
  getSocketSd: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socketSD: state.socketSd.socketSdAll,
  current: state.socketSd.current,
  isLoading: state.socketSd.isLoading,
});

export default connect(mapStateToProps, {
  getSocketSd: getAllSocketSd,
  setVisibility: setSocketSdVisibility,
})(SdSocketSM);
