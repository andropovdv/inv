/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import {
  getAllStorageDevice,
  getStorageDevice,
} from "../../../BLL/storageDeviceReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const StorageDeviceAutoComplete = (props) => {
  const { storageDevice, getStorage, searchStorage } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getStorage();
    }
  }, [open]);

  const mapFields = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.model;
      return row;
    });
    return newRows;
  };

  const storages = mapFields(storageDevice);
  const loading = open && storages.length === 0;

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
          searchStorage(null, newValue);
        }}
        id="storageDevice"
        options={storages}
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

StorageDeviceAutoComplete.propTypes = {
  getStorage: PropTypes.func.isRequired,
  searchStorage: PropTypes.func.isRequired,
  storageDevice: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  storageDevice: state.storageDevice.storageDeviceAll,
});

export default connect(mapStateToProps, {
  getStorage: getAllStorageDevice,
  searchStorage: getStorageDevice,
})(StorageDeviceAutoComplete);
