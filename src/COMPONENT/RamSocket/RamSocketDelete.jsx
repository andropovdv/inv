import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {
  deleteTypeOfRamData,
  setCurrentTypeOfRam,
} from "../../BLL/typeOfRamReducer";

const RamSocketDelete = (props) => {
  const {
    socketRams,
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
    if (socketRams.length === 1 && pagination.current !== 0) {
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
        Вы действительно хотите удалить:
        <br />
        <b>{current.socketRam}</b>
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

RamSocketDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketRam: PropTypes.string,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.isRequired,
    numPages: PropTypes.isRequired,
    perPage: PropTypes.number,
  }).isRequired,
  searchField: PropTypes.string,
  socketRams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketRam: PropTypes.string,
    })
  ).isRequired,

  onClose: PropTypes.func.isRequired,
  deleteSocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

RamSocketDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  current: state.typeOfRam.currentType,
  pagination: state.typeOfRam.pagination,
  searchField: state.typeOfRam.searchField,
  socketRams: state.typeOfRam.typeOfRam,
});

export default connect(mapStateToProps, {
  deleteSocket: deleteTypeOfRamData,
  setCurrent: setCurrentTypeOfRam,
})(RamSocketDelete);
