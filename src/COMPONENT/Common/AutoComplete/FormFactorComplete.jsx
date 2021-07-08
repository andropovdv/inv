/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import {
  getAllFormFactor,
  getFormFactor,
} from "../../../BLL/formFactorReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const FormFactorComplete = (props) => {
  const { factorSearch, getFactor, formFactor } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getFactor();
    }
  }, [open]);

  const mapsField = (fac) => {
    const newRows = fac.map((e) => {
      let row = [];
      row = e.formFactor;
      return row;
    });
    return newRows;
  };

  const factorOption = mapsField(formFactor);
  factorOption.push("");

  const loading = open && factorOption.length === 0;

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
          factorSearch(null, newValue);
        }}
        id="formFactor"
        options={factorOption}
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
FormFactorComplete.propTypes = {
  getFactor: PropTypes.func.isRequired,
  factorSearch: PropTypes.func.isRequired,
  formFactor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactor: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  formFactor: state.formFactor.formFactor,
});

export default connect(mapStateToProps, {
  getFactor: getAllFormFactor,
  factorSearch: getFormFactor,
})(React.memo(FormFactorComplete));
