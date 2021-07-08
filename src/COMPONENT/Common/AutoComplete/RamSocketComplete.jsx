/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllTypeOfRam,
  getTypeOfRamData,
} from "../../../BLL/typeOfRamReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const RamSocketComplete = (props) => {
  const { socketRams, getSocket, searchSocketRam } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getSocket();
    }
  }, [open]);

  const mapsField = (soc) => {
    const newRows = soc.map((e) => {
      let row = [];
      row = e.socketRam;
      return row;
    });
    return newRows;
  };

  const socketOption = mapsField(socketRams);
  socketOption.push("");

  const loading = open && socketOption === 0;

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
          searchSocketRam(null, newValue);
        }}
        id="socketRam"
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

RamSocketComplete.propTypes = {
  getSocket: PropTypes.func.isRequired,
  searchSocketRam: PropTypes.func.isRequired,
  socketRams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketRam: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  socketRams: state.typeOfRam.typeOfRam,
});

export default connect(mapStateToProps, {
  getSocket: getAllTypeOfRam,
  searchSocketRam: getTypeOfRamData,
})(RamSocketComplete);
