/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { Controller } from "react-hook-form";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { setFormFactorSDVisibility } from "../../BLL/modalWindowReducer";
import FormFactorSDDialog from "./FormFactorSDDialog";
import { getAllFactorSD } from "../../BLL/formFactorSdReducer";

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

const FormFactorSDSM = (props) => {
  const { current, fFactors, getFormFactor, setVisibility, control } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getFormFactor();
  }, []);

  const clickFormFactorSD = () => {
    setVisibility({
      type: true,
      header: "Добавить форм-фактор SD",
      visibility: true,
    });
  };

  const mapFields = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.formFactorSD;
      return row;
    });
    return newRows;
  };

  const fFactorsSD = mapFields(fFactors);
  fFactorsSD.push("");

  const loading = fFactorsSD.length === 0;

  return (
    <>
      {fFactors.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <FormFactorSDDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="formFactor"
                control={control}
                defaultValue={current.formFactorSD || fFactorsSD[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={fFactorsSD}
                    fullWidth
                    getOptionLabel={(option) => option}
                    value={current.formFactorSD || fFactorsSD[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickFormFactorSD()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Форм-фактор SD"
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
              <IconButton
                className={classes.button}
                onClick={clickFormFactorSD}
              >
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

FormFactorSDSM.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    formFactorSD: PropTypes.string,
  }).isRequired,
  getFormFactor: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  fFactors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactorSD: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  fFactors: state.formFactorSd.formFactorSDAll,
});

export default connect(mapStateToProps, {
  getFormFactor: getAllFactorSD,
  setVisibility: setFormFactorSDVisibility,
})(FormFactorSDSM);
