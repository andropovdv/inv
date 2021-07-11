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
import { deleteCpusData, setCurrentCpu } from "../../BLL/cpuReducer";

const CpuDelete = (props) => {
  const {
    cpus,
    searchField,
    pagination,
    current,
    open,
    onClose,
    deleteCpu,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (cpus.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteCpu(current.id, page, searchField);
    setCurrent(null, null, null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.vendor} ${current.model}`}
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

CpuDelete.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
  cpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  searchField: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,

  onClose: PropTypes.func.isRequired,
  deleteCpu: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.cpu.currentCpu,
  pagination: state.cpu.pagination,
  searchField: state.cpu.searchField,
  cpus: state.cpu.cpus,
});

export default connect(mapStateToProps, {
  deleteCpu: deleteCpusData,
  setCurrent: setCurrentCpu,
})(CpuDelete);
