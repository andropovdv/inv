import React from "react";
import { PropTypes } from "prop-types";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const SoldOut = (props) => {
  const { handleClose, errorMessage, open } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

SoldOut.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SoldOut;
