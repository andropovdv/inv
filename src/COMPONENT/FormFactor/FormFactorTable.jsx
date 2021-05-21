import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
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

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать форм-фактор",
      visibility: true,
    });
  };

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const setRow = (idRow) => {
    const res = formFactor.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
  };

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      getFactor(pagination.current + 1, searchField);
    } else {
      getFactor(pagination.current - 1, searchField);
    }
    setPage(params.page);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "formFactor", headerName: "Форм-фактор", flex: 1 },
    {
      field: "action",
      width: 120,
      headerName: "Действия",
      renderCell: () => (
        <strong>
          <IconButton color="primary" size="small" onClick={clickEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small" onClick={clickDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            loading={isLoading}
            rows={formFactor}
            columns={columns}
            autoHeight
            density="compact"
            onSelectionChange={(select) => {
              setRow(select.rowIds);
            }}
            paginationMode="server"
            onPageChange={handlePageChange}
            rowCount={pagination.error ? 0 : pagination.total}
            pageSize={pagination.perPage}
          />
          <FormFactorDelete open={open} onClose={onClose} />
        </div>
      </div>
    </div>
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
