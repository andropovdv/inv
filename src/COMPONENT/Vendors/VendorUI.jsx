import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "@material-ui/pickers/views/Calendar/Day";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from 'react-redux';

const userStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.secondary,
  },
  buttonArea: {
    marginRight: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  dialog: {
    position: "absolute",
    left: 10,
    top: 50,
  },
}));

const VendorUI = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorCode(null);
    setErrorMesage("");
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left"}}
      >
        <Alert />
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, null)(VendorUI);
