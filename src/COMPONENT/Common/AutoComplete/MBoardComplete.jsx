/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import { getAllMboardData, getMboardData } from "../../../BLL/mboardReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const MBoardComplete = (props) => {
  const { mboards, getMBoard, searchMboard } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getMBoard();
    }
  }, [open]);

  const mapField = (mb) => {
    const newRows = mb.map((e) => {
      let row = [];
      row = e.model;
      return row;
    });
    return newRows;
  };

  const mboardOption = mapField(mboards);

  const loading = open && mboardOption.length === 0;

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
        onChange={(e, newValue) => {
          searchMboard(null, newValue);
        }}
        id="MBoard"
        options={mboardOption}
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

MBoardComplete.propTypes = {
  getMBoard: PropTypes.func.isRequired,
  searchMboard: PropTypes.func.isRequired,
  mboards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  mboards: state.mboard.mboard,
});

export default connect(mapStateToProps, {
  getMBoard: getAllMboardData,
  searchMboard: getMboardData,
})(MBoardComplete);
