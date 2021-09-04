import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  deleteFactorSD,
  setCurrentFormFactorSD,
} from "../../BLL/formFactorSdReducer";

const FormFactorSDDelete = (props) => {
  const {
    open,
    searchField,
    pagination,
    factor,
    current,
    deleteFactor,
    setCurrent,
    onClose,
  } = props;

  const submit = () => {
    let page = pagination.current;
    if (factor.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    deleteFactor(current.id, page, searchField);
    setCurrent(null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.formFactorSD}`}
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

FormFactorSDDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  factor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactorSD: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactorSD: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string,
  deleteFactor: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

FormFactorSDDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  pagination: state.formFactorSd.pagination,
  factor: state.formFactorSd.formFactorSD,
  current: state.formFactorSd.current,
  searchField: state.formFactorSd.searchField,
});

export default connect(mapStateToProps, {
  deleteFactor: deleteFactorSD,
  setCurrent: setCurrentFormFactorSD,
})(FormFactorSDDelete);
