/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllSocketSd,
  getSocketSdData,
} from "../../../BLL/typeOfSocketSdReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const SdSocketComplete = (props) => {
  const { socket, getSocket, getSocketSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getSocket();
    }
  }, [open]);

  const mapsField = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.socket;
      return row;
    });
    return newRows;
  };

  const sockets = mapsField(socket);
  sockets.push("");
  const loading = open && sockets.length === 0;

  return (
    <>
      <Autocomplete
        className={classes.buttonArea}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onChange={(event, newValue) => {
          getSocketSearch(null, newValue);
        }}
        id="socketSd"
        options={sockets}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Фильтр"
            variant="outlined"
            margin="dense"
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
    </>
  );
};

SdSocketComplete.propTypes = {
  getSocket: PropTypes.func.isRequired,
  getSocketSearch: PropTypes.func.isRequired,
  socket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socket: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  socket: state.socketSd.socketSdAll,
});

export default connect(mapStateToProps, {
  getSocket: getAllSocketSd,
  getSocketSearch: getSocketSdData,
})(SdSocketComplete);
