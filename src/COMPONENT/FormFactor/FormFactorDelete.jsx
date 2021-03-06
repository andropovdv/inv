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
  deleteFormFactor,
  setCurrentFormFactor,
} from "../../BLL/formFactorReducer";

const FormFactorDelete = (props) => {
  const {
    formFactor,
    searchField,
    pagination,
    current,
    open,
    onClose,
    deleteFactor,
    setCurrent,
  } = props;

  const submit = async () => {
    let page = pagination.current;
    if (formFactor.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    await deleteFactor(current.id, page, searchField);
    setCurrent(null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        Вы действительно хотите удалить:
        <br />
        <b>{current.formFactor}</b>
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

FormFactorDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactor: PropTypes.string,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.isRequired,
    numPages: PropTypes.isRequired,
    perPage: PropTypes.number,
  }).isRequired,
  formFactor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  searchField: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  deleteFactor: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

FormFactorDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  pagination: state.formFactor.pagination,
  searchField: state.formFactor.searchField,
  current: state.formFactor.currentType,
  formFactor: state.formFactor.formFactor,
});

export default connect(mapStateToProps, {
  deleteFactor: deleteFormFactor,
  setCurrent: setCurrentFormFactor,
})(FormFactorDelete);
