import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import {
  getFactorSD,
  setCurrentFormFactorSD,
} from "../../BLL/formFactorSdReducer";
import { setFormFactorSDVisibility } from "../../BLL/modalWindowReducer";
import FormFactorSDDelete from "./FormFactorSDDelete";

const FormFactorSDTable = (props) => {
  const {
    setCurrent,
    isLoading,
    factor,
    searchField,
    pagination,
    getFactor,
    setVisibility,
  } = props;

  React.useEffect(() => {
    getFactor(pagination.current, searchField);
  }, []);

  const [openDelete, setDelete] = React.useState(false);

  const onClose = () => {
    setDelete(false);
  };

  const clickDelete = () => {
    setDelete(true);
  };

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать f/f storage device",
      visibility: true,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "formFactorSD", headerName: "Наименование", flex: 1 },
    {
      field: "action",
      headerName: "Действие",
      width: 120,
      renderCell: () => (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <IconButton color="primary" size="small" onClick={clickEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small" onClick={clickDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <FormFactorSDDelete open={openDelete} onClose={onClose} />
      {factor.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          rows={factor}
          columns={columns}
          loading={isLoading}
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getFactor(params.page, searchField)}
          rowCount={pagination.total}
          pageSize={pagination.perPage}
          autoHeight
        />
      )}
    </>
  );
};

FormFactorSDTable.propTypes = {
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  factor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactorSD: PropTypes.string,
    })
  ).isRequired,
  searchField: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  getFactor: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

FormFactorSDTable.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  pagination: state.formFactorSd.pagination,
  searchField: state.formFactorSd.searchField,
  factor: state.formFactorSd.formFactorSD,
  isLoading: state.formFactorSd.isLoading,
});

export default connect(mapStateToProps, {
  getFactor: getFactorSD,
  setVisibility: setFormFactorSDVisibility,
  setCurrent: setCurrentFormFactorSD,
})(FormFactorSDTable);
