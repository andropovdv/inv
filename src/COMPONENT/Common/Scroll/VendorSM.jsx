/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getVendorAllData } from "../../../BLL/vendorReducer";
import { setVendorVisibility } from "../../../BLL/modalWindowReducer";
import VendorDialog from "../../Vendors/VendorDialog";

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

const VendorSM = (props) => {
  const {
    vendors,
    isLoading,
    current,
    control,
    getVendor,
    setVisibility,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getVendor();
  }, []);

  const clickVendor = () => {
    setVisibility({
      type: true,
      header: "Добавить производителя",
      visibility: true,
    });
  };

  const mapsField = (ven) => {
    const newRows = ven.map((e) => {
      let row = [];
      row = e.vendor;
      return row;
    });
    return newRows;
  };

  const vendorOption = mapsField(vendors);

  vendorOption.push("");

  const loading = vendorOption.length === 0;

  return (
    <>
      {isLoading || vendors.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <VendorDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="vendor"
                control={control}
                defaultValue={current.vendor || vendorOption[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={vendorOption}
                    fullWidth
                    getOptionLabel={(options) => options}
                    // defaultValue={current.vendor || vendorOption[0]}
                    value={current.vendor || vendorOption[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickVendor()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Производитель"
                        variant="outlined"
                        // margin="dense"
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
              <IconButton className={classes.button} onClick={clickVendor}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

VendorSM.propTypes = {
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getVendor: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendorsAll,
  isLoading: state.vendor.isLoading,
});

export default connect(mapStateToProps, {
  getVendor: getVendorAllData,
  setVisibility: setVendorVisibility,
})(VendorSM);
