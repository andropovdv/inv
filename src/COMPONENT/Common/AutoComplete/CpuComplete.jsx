/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, TextField } from "@material-ui/core";
import { getAllSocketCpuData } from "../../../BLL/typeSocketCpuReducer";
import { getCpusData } from "../../../BLL/cpuReducer";

const useStyles = makeStyles((theme) => ({
  buttonArea: theme.spacing(2),
}));

const CpuComplete = (props) => {
  const { cpus, getCpu, cpuSearch } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      getCpu();
    }
  }, [open]);

  const mapsField = (data) => {
    const newRows = data.map((e) => {
      let row = [];
      row = e.model;
      return row;
    });
    return newRows;
  };

  const cpuOption = mapsField(cpus);
  cpuOption.push("");

  const loading = open && cpuOption.length === 0;

  return (
    <Autocomplete
      className={classes.buttonArea}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      onChange={(event, newValue) => {
        cpuSearch(null, newValue);
      }}
      id="cpu"
      options={cpuOption}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Фильтр"
          variant="outlined"
          margin="dense"
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
  );
};

CpuComplete.propTypes = {
  cpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  getCpu: PropTypes.func.isRequired,
  cpuSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cpus: state.cpu.cpus,
});

export default connect(mapStateToProps, {
  getCpu: getAllSocketCpuData,
  cpuSearch: getCpusData,
})(CpuComplete);
