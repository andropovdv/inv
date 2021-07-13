/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Controller } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllFormFactor } from "../../../BLL/formFactorReducer";
import { setFormFactorVisibility } from "../../../BLL/modalWindowReducer";
import FormFactorDialog from "../../FormFactor/FormFactorDialog";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    display: "inline-block",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    minHeight: "1.1875 em",
  },
}));

const FormFactorSM = (props) => {
  const { current, factors, getFactor, setVisibility, control } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getFactor();
  }, []);

  const clickFactor = () => {
    setVisibility({
      type: true,
      header: "Добавить форм-фактор",
      visibility: true,
    });
  };

  const mapField = (factor) => {
    const newRows = factor.map((e) => {
      let row = [];
      row = e.formFactor;
      return row;
    });
    return newRows;
  };

  const factorOption = mapField(factors);

  const loading = factorOption.length === 0;

  return (
    <>
      {factorOption.length === 0 ? (
        <div>
          <CircularProgress color="primary" size={20} />
        </div>
      ) : (
        <>
          <FormFactorDialog step={false} />
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="formFactor"
                control={control}
                loading={loading}
                defaultValue={current.formFactor || factorOption[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={factorOption}
                    fullWidth
                    getOptionLabel={(options) => options}
                    value={current.formFactor || factorOption[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickFactor()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Форм-фактор"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box alignItems="flex-end">
              <IconButton className={classes.button} onClick={clickFactor}>
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
  getFactor: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  factors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactor: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  factors: state.formFactor.allFormFactor,
  current: state.formFactor.currentType,
});

export default connect(mapStateToProps, {
  getFactor: getAllFormFactor,
  setVisibility: setFormFactorVisibility,
})(FormFactorSM);
