import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteVendorData, setCurrentVendor } from "../../BLL/vendorReducer";

const VendorDelete = (props) => {
  const {
    vendors,
    searchField,
    pagination,
    current,
    open,
    onClose,
    deleteVendor,
    setCurrent,
  } = props;

  const submit = () => {
    let page = pagination.current;
    if (vendors.length === 1 && pagination.current !== 0) {
      page -= 1;
    }
    deleteVendor(current.id, page, searchField);
    setCurrent(null, null, null, null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.vendor}`}
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

VendorDelete.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  searchField: PropTypes.string,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      full: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

VendorDelete.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  current: state.vendor.currentVendor,
  pagination: state.vendor.pagination,
  searchField: state.vendor.searchField,
  vendors: state.vendor.vendors,
});

export default connect(mapStateToProps, {
  deleteVendor: deleteVendorData,
  setCurrent: setCurrentVendor,
})(VendorDelete);
