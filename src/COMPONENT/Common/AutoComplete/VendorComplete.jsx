/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { TextField, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getVendorAllData, getSearchData } from "../../../BLL/vendorReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const VendorComplete = (props) => {
  const { vendors, getVendor, getSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  // const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (open) {
      getVendor();
    }
  }, [open]);

  const mapsFields = (ven) => {
    const newRows = ven.map((e) => {
      let row = [];
      row = e.label;
      return row;
    });
    return newRows;
  };

  const vendorOption = mapsFields(vendors);
  vendorOption.push("");

  // const [value, setValue] = React.useState("");

  // React.useEffect(() => {
  //   getSearch(value);
  // }, [value]);

  const loading = open && vendorOption.length === 0;

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
        // value={value}
        onChange={(event, newValue) => {
          getSearch(newValue);
        }}
        id="controllable-states-demo"
        options={vendorOption}
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

VendorComplete.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  getVendor: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendorsAll,
  isLoading: state.vendor.isLoading,
});

export default connect(mapStateToProps, {
  getVendor: getVendorAllData,
  getSearch: getSearchData,
})(VendorComplete);
