/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllSocketCpuData,
  getSocketCpuData,
} from "../../../BLL/typeSocketCpuReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const SocketCpuComplete = (props) => {
  const { searchField, socket, getSocket, socketSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getSocket();
    }
  }, [open]);

  const mapsField = (soc) => {
    const newRows = soc.map((e) => {
      // let row = [];
      const row = e.socketCpu;
      return row;
    });
    return newRows;
  };

  // let socketOption = [];
  // React.useEffect(() => {
  //   if (!isLoading) {
  //     socketOption = [];
  //     socketOption = mapsField(socket);
  //     socketOption.push("");
  //     console.warn("EDIT");
  //   }
  // }, [isLoading]);

  const socketOption = mapsField(socket);
  socketOption.push("");

  const loading = open && socketOption.length === 0;

  return (
    <>
      <Autocomplete
        value={searchField}
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
          socketSearch(null, newValue);
        }}
        id="socketCpu"
        options={socketOption}
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

SocketCpuComplete.propTypes = {
  socket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  searchField: PropTypes.string,
  getSocket: PropTypes.func.isRequired,
  socketSearch: PropTypes.func.isRequired,
};

SocketCpuComplete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  socket: state.typeCpuSocket.cpuSocketsAll,
  searchField: state.typeCpuSocket.searchField,
});

export default connect(mapStateToProps, {
  getSocket: getAllSocketCpuData,
  socketSearch: getSocketCpuData,
})(SocketCpuComplete);
