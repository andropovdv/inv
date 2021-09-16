import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  deleteStorageDevice,
  setCurrentStorageDevice,
} from "../../BLL/storageDeviceReducer";

const StorageDeviceDelete = (props) => {
  const {
    open,
    searchField,
    current,
    storages,
    pagination,
    onClose,
    deleteStorage,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (storages.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteStorage(current.id, page, searchField);
    setCurrent(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        Вы действительно хотите удалить:
        <br />
        <b>{`${current.vendor} ${current.model}`}</b>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Отмена
        </Button>
        <Button color="secondary" onClick={submit}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StorageDeviceDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.isRequired,
    numPages: PropTypes.isRequired,
    perPage: PropTypes.number,
  }).isRequired,
  storages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      volume: PropTypes.number,
      socket: PropTypes.string,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    volume: PropTypes.number,
    socket: PropTypes.string,
    formFactor: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteStorage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pagination: state.storageDevice.pagination,
  storages: state.storageDevice.storageDevice,
  current: state.storageDevice.current,
  searchField: state.storageDevice.searchField,
});

export default connect(mapStateToProps, {
  deleteStorage: deleteStorageDevice,
  setCurrent: setCurrentStorageDevice,
})(StorageDeviceDelete);
