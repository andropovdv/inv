import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CancelIcon from "@material-ui/icons/Cancel";
import CpuDataGrid from "./CpuDataGrid";
import CpuDialogForm from "./CpuDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  buttonArea: {
    marginRight: theme.spacing(2),
  },
}));

const CpusUI = (props) => {
  const {
    onSearch,
    searchField,
    onClear,
    cpus,
    isLoading,
    pagination,
    prevPage,
    nextPage,
    setCurrent,
    currentCpu,
    cpuVisibility,
    createDialog,
    closeModal,
  } = props;

  const [onDelete, setOnDelete] = React.useState(false);
  const [header, setHeader] = React.useState("");
  const [action, setAction] = React.useState(false);

  const classes = useStyles();

  const clickAdd = () => {
    setOnDelete(false);
    setHeader("Добавление производителя:");
    setAction(false);
    createDialog(true); // добавление -- редактирование
  };

  const clickEdit = () => {
    setOnDelete(false);
    setHeader("Редактирование производителя:");
    setAction(true);
    createDialog(false);
  };

  const clickDelete = () => {
    setOnDelete(true);
    createDialog(false);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="justify">
              Справочники
              <ArrowForwardIosIcon fontSize="small" />
              Процессоры
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttonArea}
                  onClick={clickAdd}
                >
                  Добавить
                </Button>
                <TextField
                  size="small"
                  variant="outlined"
                  //   className={classes.buttonArea}
                  label="Search"
                  onChange={onSearch}
                  value={searchField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={onClear}>
                          <CancelIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          <CpuDataGrid
            cpus={cpus}
            isLoading={isLoading}
            pagination={pagination}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrent={setCurrent}
            clickDelete={clickDelete}
            clickEdit={clickEdit}
          />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Информация</Typography>
            <Typography align="left">
              {typeof currentCpu.id !== "undefined" ? (
                <>
                  Разъем процессора:
                  {currentCpu.socketCpu}
                </>
              ) : null}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <CpuDialogForm
        open={cpuVisibility}
        onDelete={onDelete}
        header={header}
        onClose={closeModal}
        onSubmit={action}
      />
    </>
  );
};

CpusUI.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchField: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  createDialog: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cpuVisibility: PropTypes.bool.isRequired,
  cpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  currentCpu: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
};

export default CpusUI;
