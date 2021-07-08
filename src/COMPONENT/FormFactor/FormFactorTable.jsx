import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, Box, LinearProgress } from "@material-ui/core";
import {
  getFormFactor,
  setCurrentFormFactor,
} from "../../BLL/formFactorReducer";
import { setFormFactorVisibility } from "../../BLL/modalWindowReducer";
import FormFactorDelete from "./FormFactorDelete";

const FormFactorTable = (props) => {
  const {
    formFactor,
    isLoading,
    pagination,
    searchField,
    getFactor,
    setCurrent,
    setVisibility,
  } = props;

  React.useEffect(() => {
    getFactor(pagination.current, searchField);
  }, []);

  const [openDelete, setDelete] = React.useState(false);

  const clickDelete = () => {
    setDelete(true);
  };

  const onClose = () => {
    setDelete(false);
  };

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать форм-фактор",
      visibility: true,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "formFactor", headerName: "Форм-фактор", flex: 1 },
    {
      field: "action",
      width: 120,
      headerName: "Действия",
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
      <FormFactorDelete open={openDelete} onClose={onClose} />
      {formFactor.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          loading={isLoading}
          rows={formFactor}
          columns={columns}
          autoHeight
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getFactor(params.page, searchField)}
          rowCount={pagination.error ? 0 : pagination.total}
          pageSize={pagination.perPage}
        />
      )}
    </>
  );
};

FormFactorTable.propTypes = {
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  formFactor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  getFactor: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchField: state.formFactor.searchField,
  pagination: state.formFactor.pagination,
  isLoading: state.formFactor.isLoading,
  formFactor: state.formFactor.formFactor,
});

export default connect(mapStateToProps, {
  getFactor: getFormFactor,
  setCurrent: setCurrentFormFactor,
  setVisibility: setFormFactorVisibility,
})(FormFactorTable);
