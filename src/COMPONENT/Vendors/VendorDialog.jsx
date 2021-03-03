/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { reduxForm } from "redux-form";
import { PropTypes } from "prop-types";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "fit-content",
  },
}));

const VendorDialog = (props) => {
  const {
    onDelete,
    open,
    name,
    onClose,
    deleteVendor,
    header,
    onSubmit,
    currentVendor,
    isLoading,
    errorCode,
  } = props;
  const classes = useStyles();

  let message = "";
  if (errorCode && errorCode === 10) {
    message = "Уже есть";
  }

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Введи !!!";
    }
    return errors;
  };
  return (
    <Container>
      {onDelete ? (
        <Dialog open={open} onClose={onClose} modal="true">
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
        <Dialog open={open} onClose={onClose} modal="true">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{
              name: currentVendor.name,
              full: currentVendor.full,
              url: currentVendor.url,
            }}
            render={({
              handleSubmit,
              form,
              submitting,
              // error,
              // touched,
              // values,
              // submitError,
            }) => (
              <form onSubmit={handleSubmit} className={classes.formControl}>
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Наименование"
                    name="name"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    required
                    autoFocus
                  />
                  <TextField
                    label="Полное наименование"
                    name="full"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Сайт"
                    name="url"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                  {isLoading && <Typography color="error">Download</Typography>}
                  {errorCode && (
                    <Typography color="error">{message}</Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    type="button"
                    onClick={onClose}
                    color="primary"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="secondary" disabled={submitting}>
                    Save
                  </Button>
                  {/* <pre>{JSON.stringify(values)}</pre> */}
                </DialogActions>
              </form>
            )}
          />
        </Dialog>
      )}
    </Container>
  );
};

VendorDialog.propTypes = {
  // closeModal: PropTypes.func.isRequired,
  errorCode: PropTypes.number,
  onDelete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentVendor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  // error: PropTypes.string,
};

VendorDialog.defaultProps = {
  errorCode: null,
  name: "",
  // error: "",
};

// const VendorForm = reduxForm({ form: "vendor", enableReinitialize: true })(
//   VendorDialogForm
// );

export default VendorDialog;
