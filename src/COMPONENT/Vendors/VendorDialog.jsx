import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { InputAreaOutlined } from "../Common/FormsControls/FormsControls";
import { required } from "../../Utils/validators";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 265,
    width: "fit-content",
  },
}));

const VendorDialogForm = (props) => {
  const {
    closeModal,
    onDelete,
    open,
    name,
    onClose,
    deleteVendor,
    header,
    handleSubmit,
    error,
  } = props;
  const classes = useStyles();

  const close = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <Container>
      {onDelete ? (
        <Dialog open={open} onClose={close} modal="true">
          <DialogTitle>Удаление</DialogTitle>
          <DialogContent>
            Вы уверенны в том, что хотите удалить
            <b>{name}</b>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              Отмена
            </Button>
            <Button color="secondary" onClick={deleteVendor}>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <FormControl>
          <Dialog open={open} onClose={onClose} modal="true">
            <form onSubmit={handleSubmit} className={classes.form}>
              <DialogTitle>{header}</DialogTitle>
              <DialogContent>
                <div>
                  <Field
                    name="name"
                    placeholder="name"
                    component={InputAreaOutlined}
                    validate={[required]}
                    autoFocus
                  />
                </div>
                <div>
                  <Field
                    name="full_name"
                    placeholder="full name"
                    component={InputAreaOutlined}
                  />
                </div>
                <div>
                  <Field
                    name="url"
                    placeholder="url"
                    component={InputAreaOutlined}
                  />
                </div>
                {error && (
                  // <FormHelperText error="true">{props.error}</FormHelperText>
                  <Typography color="error">{error}</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button type="button" onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </FormControl>
      )}
    </Container>
  );
};

VendorDialogForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onDelete: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const VendorForm = reduxForm({ form: "vendor", enableReinitialize: true })(
  VendorDialogForm
);

const VendorDialog = connect(
  (state) => ({ initialValues: state.vendor.currentVendor }),
  null
)(VendorForm);

export default VendorDialog;
