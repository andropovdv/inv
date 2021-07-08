/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllTypeOfGraphSlot,
  getTypeOfGraphSlot,
} from "../../../BLL/typeOfGraphSlotReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const GraphSocketComplete = (props) => {
  const { sockets, getSocket, socketSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getSocket();
    }
  }, [open]);

  const mapsFieled = (soc) => {
    const newRows = soc.map((e) => {
      let row = [];
      row = e.socketGraph;
      return row;
    });
    return newRows;
  };

  const socketOption = mapsFieled(sockets);
  socketOption.push("");

  const loading = open && socketOption.length === 0;

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
          socketSearch(null, newValue);
        }}
        id="socketGraph"
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

GraphSocketComplete.propTypes = {
  getSocket: PropTypes.func.isRequired,
  socketSearch: PropTypes.func.isRequired,
  sockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketGraph: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  sockets: state.typeOfGraphSlot.typeOfGraphSlot,
});

export default connect(mapStateToProps, {
  getSocket: getAllTypeOfGraphSlot,
  socketSearch: getTypeOfGraphSlot,
})(React.memo(GraphSocketComplete));
