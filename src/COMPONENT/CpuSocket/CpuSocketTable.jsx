import { IconButton, Box } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import {
  setCurrentSocketCpu,
  getSocketCpuData,
} from "../../BLL/typeSocketCpuReducer";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import CpuSocketDelete from "./CpuSocketDelete";

const CpuSocketTable = (props) => {
  const {
    socketCpus,
    pagination,
    isLoading,
    searchField,

    getSocketCpu,
    setCurrent,
    setVisibility,
  } = props;

  React.useEffect(() => {
    getSocketCpu(pagination.current, searchField);
  }, []);

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const closeDelete = () => {
    setOpen(false);
  };

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать разъем",
      visibility: true,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "socketCpu", headerName: "Разъем процессора", flex: 1 },
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
      <CpuSocketDelete open={open} onClose={closeDelete} />
      <DataGrid
        localeText={ruRU.props.MuiDataGrid.localeText}
        loading={isLoading}
        rows={socketCpus}
        columns={columns}
        autoHeight
        density="compact"
        onRowClick={(rowData) => setCurrent(rowData.row)}
        paginationMode="server"
        onPageChange={(params) => getSocketCpu(params.page, searchField)}
        rowCount={pagination.error ? 0 : pagination.total}
        pageSize={pagination.perPage}
      />
    </>
  );
};

CpuSocketTable.propTypes = {
  socketCpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  setCurrent: PropTypes.func.isRequired,
  getSocketCpu: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number,
    socketCpu: PropTypes.string,
  }).isRequired,
  searchField: PropTypes.string,
};

CpuSocketTable.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  socketCpus: state.typeCpuSocket.cpuSockets,
  pagination: state.typeCpuSocket.pagination,
  isLoading: state.typeCpuSocket.isLoading,
  current: state.typeCpuSocket.currentType,
  searchField: state.typeCpuSocket.searchField,
});

export default connect(mapStateToProps, {
  getSocketCpu: getSocketCpuData,
  setCurrent: setCurrentSocketCpu,
  setVisibility: setCpuSoketVisibility,
})(CpuSocketTable);
