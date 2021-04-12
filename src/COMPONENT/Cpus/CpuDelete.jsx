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
  const { current, open, onClose, deleteCpu, setCurrent } = props;

  const submit = async () => {
    await deleteCpu({ id_cpu: current.id });
    setCurrent(null, null, null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.name} ${current.model}`}
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
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteCpu: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.cpu.currentCpu,
});

export default connect(mapStateToProps, {
  deleteCpu: deleteCpusData,
  setCurrent: setCurrentCpu,
})(CpuDelete);
