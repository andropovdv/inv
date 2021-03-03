/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
// FIXME пределать в экспот по умолчанию
import React from "react";
import { FormHelperText, TextField } from "@material-ui/core";
import s from "./FormsControls.module.css";

export const InputArea = ({ input, meta, value, autoFocus, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <span className={`${s.formControl} ${hasError ? s.error : ""}`}>
      <input {...input} {...props} autoFocus={autoFocus} />
      {hasError && <span>{meta.error}</span>}
    </span>
  );
};

export const InputAreaMaterial = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custorm
}) => {
  const hasError = touched && error;
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && invalid}
        {...input}
        {...custorm}
      />
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};

export const InputAreaOutlined = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custorm
}) => {
  // const hasError = touched && error;
  return (
    <>
      <TextField
        size="small"
        variant="outlined"
        margin="normal"
        fullWidth
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && invalid && error}
        {...input}
        {...custorm}
      />
      {/* {hasError && <Typography color="error">{error}</Typography>} */}
      {/* {hasError && <FormHelperText>{error}</FormHelperText>} */}
    </>
  );
};
