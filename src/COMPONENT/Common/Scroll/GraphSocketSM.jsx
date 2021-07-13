/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
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
import { getAllTypeOfGraphSlot } from "../../../BLL/typeOfGraphSlotReducer";
import { setGraphCardVisibility } from "../../../BLL/modalWindowReducer";
import GraphSocketDialog from "../../GraphSocket/GraphSocketDialog";

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

const GraphSocketSM = (props) => {
  const { current, sockets, getSocket, setVisibility, control } = props;

  const classes = useStyles();

  React.useEffect(() => {
    getSocket();
  }, []);

  const clickSocketGraph = () => {
    setVisibility({
      type: true,
      header: "Добавить разъем графических карт",
      visibility: true,
    });
  };

  const mapField = (soc) => {
    const newRows = soc.map((e) => {
      let row = [];
      row = e.socketGraph;
      return row;
    });
    return newRows;
  };

  const socketOption = mapField(sockets);

  const loading = socketOption.length === 0;

  return (
    <>
      {socketOption.length === 0 ? (
        <div>
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <>
          <GraphSocketDialog step={false} />
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box flexGrow={1}>
              <Controller
                name="socketGraph"
                control={control}
                defaultValue={current.socketGraph || socketOption[0]}
                onChange={(data) => data}
                render={({ onChange }) => (
                  <Autocomplete
                    className={classes.textField}
                    size="small"
                    loading={loading}
                    onChange={(e, data) => onChange(data)}
                    options={socketOption}
                    fullWidth
                    getOptionLabel={(options) => options}
                    value={current.socketGraph || socketOption[0]}
                    autoComplete
                    noOptionsText={
                      <Button
                        onMouseDown={() => clickSocketGraph()}
                        size="small"
                        color="primary"
                      >
                        Не найдено, нажмите что-бы добавить
                      </Button>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Разъем графической карты"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="primary" size={20} />
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
              <IconButton className={classes.button} onClick={clickSocketGraph}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

GraphSocketSM.propTypes = {
  getSocket: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  sockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketGraph: PropTypes.string,
    })
  ).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketGraph: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  sockets: state.typeOfGraphSlot.typeAllOfGraphSlot,
  current: state.typeOfGraphSlot.currentType,
});

export default connect(mapStateToProps, {
  getSocket: getAllTypeOfGraphSlot,
  setVisibility: setGraphCardVisibility,
})(GraphSocketSM);
