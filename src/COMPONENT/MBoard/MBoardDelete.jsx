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
import { deleteMboardData, setCurrentMboard } from "../../BLL/mboardReducer";

const MBoardDelete = (props) => {
  const {
    mboards,
    searchField,
    pagination,
    current,
    open,
    onClose,
    deleteMboard,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (mboards.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteMboard(current.id, page, searchField);
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

MBoardDelete.propTypes = {
  searchField: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
  }).isRequired,
  mboards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
      intGraph: PropTypes.bool,
      socketRam: PropTypes.string,
      quantitySocketRam: PropTypes.number,
      socketGraph: PropTypes.string,
      quantityPCI: PropTypes.number,
      quantityPCIE: PropTypes.number,
      quantitySATA: PropTypes.number,
      formFactor: PropTypes.string,
      intLAN: PropTypes.bool,
      intSound: PropTypes.bool,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.isRequired,
    numPages: PropTypes.isRequired,
    perPage: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  deleteMboard: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.mboard.current,
  pagination: state.mboard.pagination,
  searchField: state.mboard.searchField,
  mboards: state.mboard.mboard,
});

export default connect(mapStateToProps, {
  deleteMboard: deleteMboardData,
  setCurrent: setCurrentMboard,
})(MBoardDelete);
