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
  deleteTypeOfGraphSlot,
  setCurrentTypeOfGraph,
} from "../../BLL/typeOfGraphSlotReducer";

const GraphSocketDelete = (props) => {
  const {
    sockets,
    open,
    current,
    pagination,
    searchField,
    onClose,
    deleteSocket,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (sockets.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteSocket(current.id, page, searchField);
    setCurrent(null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.socketGraph}`}
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

GraphSocketDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteSocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,

  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  sockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketGraph: PropTypes.string,
    })
  ).isRequired,
  searchField: PropTypes.string,
};

GraphSocketDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  current: state.typeOfGraphSlot.currentType,
  pagination: state.typeOfGraphSlot.pagination,
  searchField: state.typeOfGraphSlot.searchField,
  sockets: state.typeOfGraphSlot.typeOfGraphSlot,
});

export default connect(mapStateToProps, {
  deleteSocket: deleteTypeOfGraphSlot,
  setCurrent: setCurrentTypeOfGraph,
})(GraphSocketDelete);
