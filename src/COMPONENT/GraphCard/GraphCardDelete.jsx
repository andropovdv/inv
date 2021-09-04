import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  deleteGraphCard,
  setCurrentGraphCard,
} from "../../BLL/graphCardReducer";

const GraphCardDelete = (props) => {
  const {
    graphCard,
    open,
    current,
    pagination,
    searchField,
    onClose,
    deleteGraph,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (graphCard.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteGraph(current.id, page, searchField);
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

GraphCardDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  searchField: PropTypes.string,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketGraph: PropTypes.string,
    volume: PropTypes.number,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.isRequired,
    numPages: PropTypes.isRequired,
    perPage: PropTypes.number,
  }).isRequired,
  graphCard: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      socketGraph: PropTypes.string,
      volume: PropTypes.number,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  deleteGraph: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

GraphCardDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  current: state.graphCard.current,
  pagination: state.graphCard.pagination,
  searchField: state.graphCard.searchField,
  graphCard: state.graphCard.graphCard,
});

export default connect(mapStateToProps, {
  deleteGraph: deleteGraphCard,
  setCurrent: setCurrentGraphCard,
})(GraphCardDelete);
