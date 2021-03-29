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
  const { open, onClose, current, deleteSocket, setCurrent } = props;

  const submit = async () => {
    await deleteSocket({ id: current.id });
    setCurrent(null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
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
  onClose: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
  deleteSocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.typeCpuSocket.currentType,
});

export default connect(mapStateToProps, {
  deleteSocket: deleteSoketCpuData,
  setCurrent: setCurrentSocketCpu,
})(CpuSocketDelete);
