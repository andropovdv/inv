/* eslint-disable react/prop-types */
// FIXME Проверить модернизацию, сделал загрузку при клике
import React from "react";
import { Controller } from "react-hook-form";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { getVendorAllData } from "../../../BLL/vendorReducer";
import { setVendorVisibility } from "../../../BLL/modalWindowReducer";
import VendorDialog from "../../Vendors/VendorDialog";
// TODO посмотреть PropTypes => control

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: "1.1876 em",
  },
}));

const VendorSM = (props) => {
  const {
    setVisibilityVendor,
    getVendor,
    vendorsAll,
    isLoading,
    control,
    current,
  } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getVendor();
    }
  }, [open]);

  const clickVendor = () => {
    setVisibilityVendor({
      type: true,
      header: "Добавить производителя",
      visibility: true,
    });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <VendorDialog step={false} />

          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <Controller
                name="vendor"
                control={control}
                defaultValue={current.vendor || vendorsAll[0].label}
                render={({ onChange, value }) => (
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    >
                      <InputLabel shrink id="labelVendor">
                        Производитель
                      </InputLabel>
                      <Select
                        open={open}
                        onOpen={() => {
                          setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        labelId="labelVendor"
                        disabled={isLoading}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="Производитель"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {vendorsAll.map((e) => (
                          <MenuItem key={e.id} value={e.label}>
                            {e.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
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
  getVendor: PropTypes.func.isRequired,
  setVisibilityVendor: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {
  getVendor: getVendorAllData,
  setVisibilityVendor: setVendorVisibility,
})(VendorSM);
