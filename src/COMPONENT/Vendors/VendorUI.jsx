import {
  Grid,
  Paper,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import { PropTypes } from "prop-types";
import VendorsDataGrid from "./VendorsDataGrid";
import VendorDialog from "./VendorDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  buttonArea: {
    // marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const VendorUI = (props) => {
  const {
    createDialog,
    onSearch,
    searchField,
    onClear,
    updateVendor,
    currentVendor,
    deleteVendor,
    vendorVisibility,
    closeModal,
    addVendor,
    prevPage,
    nextPage,
    setCurrent,
    vendors,
    isLoading,
    pagination,
  } = props;
  const classes = useStyles();
  const [header, setHeader] = React.useState("");
  const [action, setAction] = React.useState(false); // default: ADD VENDOR
  const [onDelete, setOnDelete] = React.useState(false);

  const clickAdd = () => {
    setOnDelete(false);
    setHeader("Добавление производителя:");
    setAction(false);
    createDialog(true);
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
            <Typography variant="h6" align="left">
              Справочники:/ Производители
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
                  className={classes.buttonArea}
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
          <VendorsDataGrid
            pagination={pagination}
            isLoading={isLoading}
            vendors={vendors}
            setCurrent={setCurrent}
            prevPage={prevPage}
            nextPage={nextPage}
            clickEdit={clickEdit}
            clickDelete={clickDelete}
            onSubmit={updateVendor} // FIXME провериить (было editVendor)
          />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="left" component="span">
              Информация
            </Typography>
            <Typography align="left">
              {typeof currentVendor.id_vendor !== "undefined" ? (
                <>
                  Сайт
                  {currentVendor.url}
                  <br />
                  Сайт:
                  {currentVendor.name}
                  <br />
                  Сайт:
                  {currentVendor.full_name}
                  <br />
                </>
              ) : null}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <VendorDialog
        name={currentVendor.name}
        deleteVendor={deleteVendor}
        onDelete={onDelete}
        open={vendorVisibility}
        onClose={closeModal}
        header={header}
        onSubmit={action ? updateVendor : addVendor}
      />
    </>
  );
};

VendorUI.propTypes = {
  createDialog: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  updateVendor: PropTypes.func.isRequired,
  currentVendor: PropTypes.objectOf([PropTypes.number, PropTypes.stirng])
    .isRequired,
  deleteVendor: PropTypes.func.isRequired,
  vendorVisibility: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addVendor: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  vendors: PropTypes.objectOf([PropTypes.number, PropTypes.stirng]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.objectOf([PropTypes.number, PropTypes.stirng])
    .isRequired,
};

export default VendorUI;
