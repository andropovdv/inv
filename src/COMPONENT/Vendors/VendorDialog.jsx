import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { connect } from "react-redux";
import { deleteVendorData } from "../../BLL/vendorReducer";

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
    isLoading,

    onDelete,
    open,
    onClose,
    deleteVendor,
    header,
    onSubmit,
    currentVendor,
  } = props;
  const classes = useStyles();

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
            <b>{currentVendor.name}</b>
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
            render={({ handleSubmit, values }) => (
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
                  <Button type="submit" color="secondary" disabled={isLoading}>
                    Save
                  </Button>
                </DialogActions>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </Dialog>
      )}
    </Container>
  );
};

VendorDialog.propTypes = {
  onDelete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
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
};

// VendorDialog.defaultProps = {
//   name: "",
// };

const mapStateToProps = (state) => ({
  isLoading: state.vendor.isLoading,
  currentVendor: state.vendor.currentVendor,
});

export default connect(mapStateToProps, {
  deleteVendor: deleteVendorData,
})(VendorDialog);
