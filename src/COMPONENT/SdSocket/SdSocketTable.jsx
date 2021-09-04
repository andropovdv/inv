import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import {
  getSocketSdData,
  setCurrentSocketSd,
} from "../../BLL/typeOfSocketSdReducer";
import { setSocketSdVisibility } from "../../BLL/modalWindowReducer";
import SdSocketDelete from "./SdSocketDelete";

const SdSocketTable = (props) => {
  const {
    isLoading,
    sockets,
    searchField,
    pagination,
    getSocket,
    setVisibility,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getSocket(pagination.current, searchField);
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
      header: "Редактировать storage devices",
      visibility: true,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "socket", headerName: "Наименование", flex: 1 },
    {
      field: "action",
      width: 120,
      headerName: "Действие",
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
      <SdSocketDelete open={openDelete} onClose={onClose} />
      {sockets.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          rows={sockets}
          columns={columns}
          loading={isLoading}
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getSocket(params.page, searchField)}
          rowCount={pagination.total}
          pageSize={pagination.perPage}
          autoHeight
        />
      )}
    </>
  );
};

SdSocketTable.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  getSocket: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  sockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socket: PropTypes.string,
    })
  ).isRequired,
  searchField: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

SdSocketTable.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  pagination: state.socketSd.pagination,
  searchField: state.socketSd.searchField,
  sockets: state.socketSd.socketSd,
  isLoading: state.socketSd.isLoading,
});

export default connect(mapStateToProps, {
  getSocket: getSocketSdData,
  setVisibility: setSocketSdVisibility,
  setCurrent: setCurrentSocketSd,
})(SdSocketTable);
