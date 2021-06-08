/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { getAllFormFactor } from "../../BLL/formFactorReducer";

const FormFactorSM = (props) => {
  const { current, isLoading, formFactorSC, getFactor, control } = props;

  React.useEffect(() => getFactor(), []);
  return (
    <>
      {formFactorSC.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Controller
          name="formFactor"
          control={control}
          defaultValue={current.formFactor || formFactorSC[0].formFactor}
          as={
            <Select
              id="labelFormFactor"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              margin="dense"
              label="Форм Фактор"
              defaultValue={current.formFactor || formFactorSC[0].formFactor}
            >
              {formFactorSC.map((e) => (
                <MenuItem key={e.id} value={e.formFactor}>
                  {e.formFactor}
                </MenuItem>
              ))}
            </Select>
          }
        />
      )}
    </>
  );
};

FormFactorSM.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  formFactorSC: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactor: PropTypes.string,
  }).isRequired,
  getFactor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formFactorSC: state.formFactor.allFormFactor,
  isLoading: state.formFactor.isLoading,
});

export default connect(mapStateToProps, {
  getFactor: getAllFormFactor,
})(FormFactorSM);
