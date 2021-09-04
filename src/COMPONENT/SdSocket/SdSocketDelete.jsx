import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  deleteSocketSdData,
  setCurrentSocketSd,
} from "../../BLL/typeOfSocketSdReducer";

const SdSocketDelete = (props) => {
  const {
    open,
    searchField,
    current,
    socket,
    pagination,
    onClose,
    deleteSocket,
    setCurrent,
  } = props;

  const submit = () => {
    let page = pagination.current;
    if (socket.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    deleteSocket(current.id, page, searchField);
    setCurrent(null, null);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.socket}`}
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

SdSocketDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  searchField: PropTypes.string,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  socket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socket: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socket: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  deleteSocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

SdSocketDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  pagination: state.socketSd.pagination,
  socket: state.socketSd.socketSd,
  current: state.socketSd.current,
  searchField: state.socketSd.searchField,
});

export default connect(mapStateToProps, {
  deleteSocket: deleteSocketSdData,
  setCurrent: setCurrentSocketSd,
})(SdSocketDelete);
