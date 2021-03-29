import React from "react";
import { PropTypes } from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { setCurrentVendor } from "../../BLL/vendorReducer";

const VendorsDataGrid = (props) => {
  const {
    isLoading,

    prevPage,
    nextPage,
    setCurrent,
    clickDelete,
    clickEdit,
    vendors,
    pagination,
  } = props;
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Наименование", flex: 0.5 },
    { field: "full", headerName: "Полное", flex: 1 },
    { field: "url", headerName: "URL", hide: true },
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

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      nextPage();
    } else {
      prevPage();
    }
    setPage(params.page);
  };

  const setCurrentRow = (idRow) => {
    const result = vendors.find((item) => item.id === parseInt(idRow, 10));
    setCurrent(result);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={vendors}
            columns={columns}
            autoHeight
            loading={isLoading}
            density="compact"
            onSelectionChange={(newSelection) => {
              setCurrentRow(newSelection.rowIds);
            }}
            paginationMode="server"
            onPageChange={handlePageChange}
            rowCount={pagination.total}
            pageSize={pagination.perPage}
          />
        </div>
      </div>
    </div>
  );
};

VendorsDataGrid.propTypes = {
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      full: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.vendor.isLoading,
  vendors: state.vendor.vendors,
  pagination: state.vendor.pagination,
});

export default connect(mapStateToProps, {
  setCurrent: setCurrentVendor,
})(VendorsDataGrid);
