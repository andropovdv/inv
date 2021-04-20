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
  const { current, open, onClose, deleteVendor, setCurrent } = props;

  const submit = async () => {
    deleteVendor(current.id);
    setCurrent(null, null, null, null);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        {`Вы действительно хотите удалить ${current.name}`}
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
    name: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.vendor.currentVendor,
});

export default connect(mapStateToProps, {
  deleteVendor: deleteVendorData,
  setCurrent: setCurrentVendor,
})(VendorDelete);
