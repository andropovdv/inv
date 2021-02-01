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
  const { onSearch, searchField, onClear } = props;
  const classes = useStyles();
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
            <Button
              color="primary"
              variant="contained"
              className={classes.buttonArea}
              //   onClick={clickAdd}
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
          </Paper>
        </Grid>
        <CpuDataGrid />
        <Grid itm xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Информация</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

CpusUI.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchField: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default CpusUI;
