import React from "react";
import { PropTypes } from "prop-types";
import {
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
} from "@material-ui/core";

const CpuDialogForm = (props) => {
  const { open, onDelete, header, onClose } = props;

  const close = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <Container>
      {onDelete ? (
        <Dialog open={open} onClose={close} modal="true">
          <DialogTitle>Удаление</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              Отмена
            </Button>
            <Button color="secondary">Удалить</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={onClose} modal="true">
          <DialogTitle>{header}</DialogTitle>
          <DialogContent>coming soon Final Form</DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      ;
    </Container>
  );
};

CpuDialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onDelete: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CpuDialogForm;
