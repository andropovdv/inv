import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  deleteSoketCpuData,
  setCurrentSocketCpu,
} from "../../BLL/typeSocketCpuReducer";

const CpuSocketDelete = (props) => {
  const {
    searchField,
    pagination,
    open,
    socketCpu,
    onClose,
    current,
    deleteSocket,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (socketCpu.lenght === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteSocket(current.id, page, searchField);
    setCurrent(null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent dividers>
        Вы действительно хотите удалить:
        <br />
        <b>{current.socketCpu}</b>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={submit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CpuSocketDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  searchField: PropTypes.string,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  socketCpu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketCpu: PropTypes.string,
    })
  ).isRequired,

  onClose: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
  deleteSocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

CpuSocketDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  current: state.typeCpuSocket.currentType,
  pagination: state.typeCpuSocket.pagination,
  searchField: state.typeCpuSocket.searchField,
  socketCpu: state.typeCpuSocket.cpuSockets,
});

export default connect(mapStateToProps, {
  deleteSocket: deleteSoketCpuData,
  setCurrent: setCurrentSocketCpu,
})(CpuSocketDelete);
