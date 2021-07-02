/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import { PropTypes } from "prop-types";

const CheckBoxSM = (props) => {
  const { nameField, control, desc, current } = props;

  return (
    <Controller
      name={nameField}
      control={control}
      defaultValue={current}
      // rules={{
      //   required: "Обязательное",
      //   minLength: { value: 2, message: "Короткое" },
      // }}
      render={({ onChange, value }) => (
        <FormControl>
          <FormControlLabel
            label={desc}
            labelPlacement="end"
            control={
              <Checkbox
                checked={value}
                color="primary"
                onChange={(e) => onChange(e.target.checked)}
              />
            }
          />
        </FormControl>
      )}
    />
  );
};

CheckBoxSM.propTypes = {
  nameField: PropTypes.string.isRequired,
  desc: PropTypes.string,
  current: PropTypes.bool,
};

CheckBoxSM.defaultProps = {
  desc: "NOT Label",
  current: false,
};

export default CheckBoxSM;
