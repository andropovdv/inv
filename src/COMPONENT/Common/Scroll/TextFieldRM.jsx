/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => ({
  textFieled: {
    marginTop: theme.spacing(2),
  },
}));

const TextFieldRM = (props) => {
  const { control, errors, current, nameField, num, desc } = props;

  const classes = useStyles();

  return (
    <Controller
      name={nameField}
      control={control}
      defaultValue={current}
      render={({ value, name, onChange }) => (
        <TextField
          type={num ? "number" : "text"}
          fullWidth
          className={classes.textFieled}
          id={`label-${name}`}
          variant="outlined"
          size="small"
          error={!!errors[name]}
          label={errors[name] ? errors[name.message] : desc}
          InputLabelProps={{ shrink: true }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
};

TextFieldRM.propTypes = {
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  nameField: PropTypes.string.isRequired,
  num: PropTypes.bool,
  desc: PropTypes.string,
};

TextFieldRM.defaultProps = {
  current: "",
  num: false,
  desc: "NOT Label",
};

export default TextFieldRM;
