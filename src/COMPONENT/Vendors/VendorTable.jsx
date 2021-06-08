import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { getVendorsData, setCurrentVendor } from "../../BLL/vendorReducer";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";
import VendorDelete from "./VendorDelete";

const VendorTable = (props) => {
  const {
    vendors,
    isLoading,
    pagination,
    searchField,

    setCurrent,
    getVendors,
    setVisibility,
  } = props;

  React.useEffect(() => {
    getVendors(pagination.current, searchField);
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
      header: "Редактировать производителя",
      visibility: true,
    });
  };

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      getVendors(pagination.current + 1, searchField);
    } else {
      getVendors(pagination.current - 1, searchField);
    }
    setPage(params.page);
  };

  const setRow = (idRow) => {
    const res = vendors.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "vendor", headerName: "Наименование", flex: 0.5 },
    { field: "full", headerName: "Полное наименование", flex: 1 },
    { field: "url", headerName: "Web", hide: true },
    {
      field: "action",
      width: 120,
      headerName: "Действие",
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
          <VendorDelete open={openDelete} onClose={onClose} />
          <DataGrid
            rows={vendors}
            columns={columns}
            loading={isLoading}
            density="compact"
            onSelectionChange={(select) => {
              setRow(select.rowIds);
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

VendorTable.propTypes = {
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      full: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchField: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,

  setCurrent: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendors,
  isLoading: state.vendor.isLoading,
  pagination: state.vendor.pagination,
  searchField: state.vendor.searchField,
});

export default connect(mapStateToProps, {
  setCurrent: setCurrentVendor,
  setVisibility: setVendorVisibility,
  getVendors: getVendorsData,
})(VendorTable);
