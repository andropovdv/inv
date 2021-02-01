import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { LoginReduxForm } from "./LoginForm";
import { signin } from "../../BLL/authReducer";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     mardinTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "colunm",
//     alignItem: "center",
//   },
//   avatar: {},
//   form: {},
//   submit: {},
// }));

const Login = (props) => {
  const { login, isAuth } = props;

  const onSubmit = (formData) => {
    login(formData.email, formData.pass);
  };

  return (
    <Container component="main" minWidth="xs">
      <Dialog open={!isAuth}>
        <DialogTitle>Вход в систему</DialogTitle>
        <DialogContent>
          <LoginReduxForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login: signin })(Login);
