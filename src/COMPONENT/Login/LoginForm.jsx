/* eslint-disable import/prefer-default-export */
import { Button, FormControl, FormHelperText } from "@material-ui/core";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { required, email } from "../../Utils/validators";
import { InputAreaMaterial } from "../Common/FormsControls/FormsControls";

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
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const { pristine, submitting, handleSubmit, error } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <FormControl className={classes.formControl}>
        <div>
          <Field
            placeholder="e-mail"
            name="email"
            component={InputAreaMaterial}
            label="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <Field
            placeholder="Password"
            name="pass"
            component={InputAreaMaterial}
            type="password"
            validate={[required]}
            label="Password"
          />
        </div>

        {error && <FormHelperText error="true">{error}</FormHelperText>}
        <Button
          type="submit"
          disabled={pristine || submitting}
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </FormControl>
    </form>
  );
};

LoginForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
