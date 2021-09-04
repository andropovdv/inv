/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { CircularProgress, TextField } from "@material-ui/core";
import { getAllFactorSD, getFactorSD } from "../../../BLL/formFactorSdReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const FormFactorSDComplete = (props) => {
  const { factor, getFactor, getFactorSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getFactor();
    }
  }, [open]);

  const mapsField = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.formFactorSD;
      return row;
    });
    return newRows;
  };

  const factors = mapsField(factor);
  factors.push("");
  const loading = open && factors.length === 0;

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
          getFactorSearch(null, newValue);
        }}
        id="formFactorSD"
        options={factors}
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

FormFactorSDComplete.propTypes = {
  getFactor: PropTypes.func.isRequired,
  getFactorSearch: PropTypes.func.isRequired,
  factor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactorSD: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  factor: state.formFactorSd.formFactorSDAll,
});

export default connect(mapStateToProps, {
  getFactor: getAllFactorSD,
  getFactorSearch: getFactorSD,
})(FormFactorSDComplete);
