/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FormFactorDialog from "../../FormFactor/FormFactorDialog";
import { getAllFormFactor } from "../../../BLL/formFactorReducer";
import { setFormFactorVisibility } from "../../../BLL/modalWindowReducer";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    display: "inline=block",
    padding: 0,
    minHeight: "1.1876 em",
  },
}));

const FormFactorSM = (props) => {
  const {
    isLoading,
    formFactorSC,
    getFactor,
    control,
    current,
    setVisibilityFormFactor,
  } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getFactor();
  }, []);

  const handleFormFactor = () => {
    setVisibilityFormFactor({
      type: true,
      header: "Добавить форм-фактор",
      visibility: true,
    });
  };

  return (
    <>
      {formFactorSC.length === 0 ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <FormFactorDialog step={false} />
          <Box display="flex" alignItems="flex-end">
            <Box flexGrow={1}>
              <Controller
                name="formFactor"
                control={control}
                defaultValue={current.formFactor || formFactorSC[0].formFactor}
                render={({ onChange, value }) => (
                  <>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    >
                      <InputLabel shrink id="labelFactor">
                        ФормФактор
                      </InputLabel>
                      <Select
                        labelId="labelFactor"
                        disabled={isLoading}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="Форм-фактор"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {formFactorSC.map((e) => (
                          <MenuItem key={e.id} value={e.formFactor}>
                            {e.formFactor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
            </Box>
            <Box alignItems="flex-end">
              <IconButton className={classes.button} onClick={handleFormFactor}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
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
    is: PropTypes.number,
    formFactor: PropTypes.string,
  }).isRequired,
  getFactor: PropTypes.func.isRequired,
  setVisibilityFormFactor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formFactorSC: state.formFactor.allFormFactor,
  isLoading: state.formFactor.isLoading,
});

export default connect(mapStateToProps, {
  getFactor: getAllFormFactor,
  setVisibilityFormFactor: setFormFactorVisibility,
})(FormFactorSM);
