/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Controller } from "react-hook-form";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { getVendorAllData } from "../../../BLL/vendorReducer";
// TODO посмотреть PropTypes => control
const VendorSM = (props) => {
  const { getVendor, vendorsAll, isLoading, control, current } = props;

  React.useEffect(() => {
    getVendor();
  }, []);

  return (
    <>
      {vendorsAll.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Controller
          as={
            <Select
              id="labelVendor"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
              label="Производитель"
              // defaultValue={current.id || vendorsAll[0].id}
              defaultValue={current.vendor || vendorsAll[0].label}
            >
              {vendorsAll.map((e) => (
                <MenuItem key={e.id} value={e.label}>
                  {e.label}
                </MenuItem>
              ))}
            </Select>
          }
          name="vendor"
          control={control}
          // defaultValue={current.id || vendorsAll[0].id}
          defaultValue={current.vendor || vendorsAll[0].label}
        />
      )}
    </>
  );
};

VendorSM.propTypes = {
  getVendor: PropTypes.func.isRequired,
  vendorsAll: PropTypes.arrayOf(
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
};

const mapStateToProps = (state) => ({
  vendorsAll: state.vendor.vendorsAll,
  isLoading: state.vendor.isLoading,
});

export default connect(mapStateToProps, { getVendor: getVendorAllData })(
  VendorSM
);
