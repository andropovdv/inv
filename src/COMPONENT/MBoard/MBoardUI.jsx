import React from "react";
import { PropTypes } from "prop-types";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  changeSearch,
  getMboardData,
  getSearchMboard,
  setBackEndMessage,
  setCurrentMboard,
  setError,
} from "../../BLL/mboardReducer";
import { setMboardVisibility } from "../../BLL/modalWindowReducer";
import MBoardTable from "./MBoardTable";
import MBoardDialog from "./MBoardDialog";
import VendorDialog from "../Vendors/VendorDialog";
import CpuSocketDialog from "../CpuSocket/CpuSocketDialog";
import RamSocketDialog from "../RamSocket/RamSocketDialog";
import GraphSocketDialog from "../GraphSocket/GraphSocketDialog";
import FormFactorDialog from "../FormFactor/FormFactorDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  buttonArea: {
    marginRight: theme.spacing(2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const MBoardUI = (props) => {
  const {
    current,
    errorMessage,
    searchField,
    setErrorCode,
    setErrorMessage,
    setCurrent,
    setVisibility,
    getMboard,
    clearSearch,
    getSearch,
  } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClose = (reason) => {
    if (reason === "clickway") {
      return;
    }
    setErrorCode(null);
    setErrorMessage("");
    setOpen(false);
  };

  const addClick = () => {
    setCurrent(null); // FIXME проверить нуление current
    setVisibility({
      type: true,
      header: "Добавить материнскую плату",
      visibility: true,
    });
  };

  const onSearch = (e) => {
    getSearch(e.target.value);
  };

  const onClear = () => {
    getMboard();
    clearSearch("");
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <VendorDialog step={false} />
      <CpuSocketDialog step={false} />
      <RamSocketDialog step={false} />
      <GraphSocketDialog step={false} />
      <FormFactorDialog step={false} />

      <MBoardDialog step />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left">
              Справочники:/ Материнские платы
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center">
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonArea}
                onClick={addClick}
              >
                Добавить
              </Button>
              <TextField
                onChange={onSearch}
                value={searchField}
                variant="outlined"
                size="small"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={onClear} edge="end">
                        <CancelIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
          <MBoardTable />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация:
            </Typography>
            {Object.keys(current).length !== 0 ? (
              <Box direction="column">
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Производитель:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.vendor}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Модель:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.model}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Разъем CPU:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.socketCpu}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Разъем RAM:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.socketRam}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Разъем графического адаптера:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.socketGraph}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Встроенное видео:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.intGraph ? "Есть" : "Отсутствует"}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Встроенный сетевой адаптер:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.intLAN ? "Есть" : "Отсутствует"}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Встроенный звуковой адаптер:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.intSound ? "Есть" : "Отсутствует"}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Количество слотов PCI:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.quantityPCI}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Количество слотов PCIE:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.quantityPCI}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Количество слотов IDE:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.quantityIDE}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Количество слотов SATA:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.quantitySATA}
                  </Box>
                </Box>
                <Box display="flex" direction="row">
                  <Box flexGrow={1} textOverflow="ellipsis" overflow="hidden">
                    Форм-фактор:
                  </Box>
                  <Box textOverflow="ellipsis" overflow="hidden">
                    {current.formFactor}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

MBoardUI.propTypes = {
  searchField: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    intGraph: PropTypes.bool,
    socketRam: PropTypes.string,
    quantitySocketRam: PropTypes.number,
    socketGraph: PropTypes.string,
    quantityPCI: PropTypes.number,
    quantityPCIE: PropTypes.number,
    quantityIDE: PropTypes.number,
    quantitySATA: PropTypes.number,
    formFactor: PropTypes.string,
    intLAN: PropTypes.bool,
    intSound: PropTypes.bool,
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  getMboard: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.mboard.backEndMessage,
  searchField: state.mboard.searchField,
  current: state.mboard.current,
});

export default connect(mapStateToProps, {
  setErrorCode: setError,
  setErrorMessage: setBackEndMessage,
  setCurrent: setCurrentMboard,
  setVisibility: setMboardVisibility,
  getMboard: getMboardData,
  clearSearch: changeSearch,
  getSearch: getSearchMboard,
})(MBoardUI);
