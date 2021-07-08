/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
// import { LoginReduxForm } from "./LoginForm";
import { Controller, useForm } from "react-hook-form";
import { signin } from "../../BLL/authReducer";
import { setBackEndMessage } from "../../BLL/errorReducer";
import SoldOut from "../Common/SoldOut";

const useStyles = makeStyles((theme) => ({
  paper: {
    mardinTop: theme.spacing(8),
    display: "flex",
    flexDirection: "colunm",
    alignItem: "center",
  },
  avatar: {},
  form: {},
  submit: {},
  textField: {
    marginTop: theme.spacing(1),
  },
  actionButton: {
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
  },
}));

const Login = (props) => {
  const { login, isAuth, errorMessage, setErrorMessage } = props;

  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.pass);
  };

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClose = (reason) => {
    if (reason === "clickway") {
      return;
    }
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <>
      <SoldOut
        open={open}
        errorMessage={errorMessage}
        handleClose={handleClose}
      />
      <Dialog open={!isAuth}>
        <DialogTitle>Вход в систему</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Обязательное",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }}
              defaultValue=""
              as={
                <TextField
                  autoFocus
                  fullWidth
                  variant="outlined"
                  className={classes.TextField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  label={errors.email ? errors.email.message : "Email"}
                  error={!!errors.email}
                />
              }
            />
            <Controller
              name="pass"
              control={control}
              defaultValue=""
              as={
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  className={classes.TextField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  label={errors.pass ? errors.email.pass : "Password"}
                  error={!!errors.pass}
                />
              }
            />
          </DialogContent>
          <DialogActions className={classes.actionButton}>
            <Button color="primary" type="submit" variant="outlined" fullWidth>
              LOGIN
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  errorMessage: state.error.backEndMessage,
});

export default connect(mapStateToProps, {
  login: signin,
  setErrorMessage: setBackEndMessage,
})(Login);
