/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllGraphCard,
  getGraphCardData,
} from "../../../BLL/graphCardReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const GraphCardComplete = (props) => {
  const { graphCard, getGraphCard, getGraphCardSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getGraphCard();
    }
  }, [open]);

  const mapsField = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.model;
      return row;
    });
    return newRows;
  };

  const graphCardOption = mapsField(graphCard);
  graphCardOption.push("");

  const loading = graphCardOption.length === 0;

  return (
    <>
      <Autocomplete
        className={classes.buttonArea}
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onChange={(event, newValue) => {
          getGraphCardSearch(null, newValue);
        }}
        id="GraphCard"
        options={graphCardOption}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Фильтр"
            variant="outlined"
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

GraphCardComplete.propTypes = {
  getGraphCard: PropTypes.func.isRequired,
  getGraphCardSearch: PropTypes.func.isRequired,
  graphCard: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      socketGraph: PropTypes.string,
      volume: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  graphCard: state.graphCard.allGraphCard,
});

export default connect(mapStateToProps, {
  getGraphCard: getAllGraphCard,
  getGraphCardSearch: getGraphCardData,
})(GraphCardComplete);
