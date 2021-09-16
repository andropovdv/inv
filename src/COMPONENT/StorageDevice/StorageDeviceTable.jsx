import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import {
  getStorageDevice,
  setCurrentStorageDevice,
} from "../../BLL/storageDeviceReducer";
import { setStorageDeviceVisibility } from "../../BLL/modalWindowReducer";
import StorageDeviceDelete from "./StorageDeviceDelete";

const StorageDeviceTable = (props) => {
  const {
    isLoading,
    storages,
    searchField,
    pagination,
    getStorage,
    setVisibility,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getStorage(pagination.current, searchField);
  }, []);

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать устройство хранения",
      visibility: true,
    });
  };

  const [openDelete, setDelete] = React.useState(false);

  const clickDelete = () => {
    setDelete(true);
  };

  const onClose = () => {
    setDelete(false);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "vendor", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
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
      <StorageDeviceDelete open={openDelete} onClose={onClose} />
      {storages.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          loading={isLoading}
          rows={storages}
          columns={columns}
          autoHeight
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getStorage(params.page, searchField)}
          rowCount={pagination.total}
          pageSize={pagination.perPage}
        />
      )}
    </>
  );
};

StorageDeviceTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  storages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      volume: PropTypes.number,
      socket: PropTypes.string,
      formFactor: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string.isRequired,
  getStorage: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pagination: state.storageDevice.pagination,
  searchField: state.storageDevice.searchField,
  storages: state.storageDevice.storageDevice,
  isLoading: state.storageDevice.isLoading,
});

export default connect(mapStateToProps, {
  getStorage: getStorageDevice,
  setVisibility: setStorageDeviceVisibility,
  setCurrent: setCurrentStorageDevice,
})(StorageDeviceTable);
