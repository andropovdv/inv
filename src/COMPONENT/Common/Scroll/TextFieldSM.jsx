/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from "react";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
  },
}));

const TextFieldSM = (props) => {
  const { control, current, errors, nameField, num, desc } = props;

  const classes = useStyles();
  return (
    <Controller
      name={nameField}
      control={control}
      defaultValue={current}
      rules={{
        required: "Обязательное",
        // TODO понять насколько нужна проверка и на каком этапе ее производить
        // min: num ? { value: 0, message: "проверьте количество" } : undefined,
        // max: num ? { value: 10, message: "проверьте количество" } : undefined,
        minLength: num ? undefined : { value: 2, message: "Короткое" },
      }}
      render={({ value, name, onChange }) => (
        <TextField
          type={num ? "number" : "text"}
          fullWidth
          className={classes.textField}
          id={`label-${name}`}
          variant="outlined"
          size="small"
          error={!!errors[name]}
          label={errors[name] ? errors[name].message : desc}
          InputLabelProps={{ shrink: true }}
          value={value}
          // value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
};

TextFieldSM.propTypes = {
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  nameField: PropTypes.string.isRequired,
  num: PropTypes.bool,
  desc: PropTypes.string,
};

TextFieldSM.defaultProps = {
  num: false,
  current: "",
  desc: "NOT Label",
};

export default TextFieldSM;
