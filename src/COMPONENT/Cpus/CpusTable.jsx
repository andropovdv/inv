import { Box, IconButton, LinearProgress } from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import { getCpusData, setCurrentCpu } from "../../BLL/cpuReducer";
import { setCpuVisibility } from "../../BLL/modalWindowReducer";
import CpuDelete from "./CpuDelete";

const CpusTable = (props) => {
  const {
    cpus,
    isLoading,
    pagination,
    getCpus,
    setCurrent,
    setVisibilityCpu,
    searchFileld,
  } = props;

  React.useEffect(() => {
    getCpus(pagination.current, searchFileld);
  }, []);

  const [openDelete, setDelete] = React.useState(false);

  const clickDelete = () => {
    setDelete(true);
  };

  const onClose = () => {
    setDelete(false);
  };

  const clickEdit = () => {
    setVisibilityCpu({
      type: false,
      header: "Редактировать процессор",
      visibility: true,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "vendor", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
    { field: "socketCpu", headerName: "Разъем", flex: 0.5 },
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
      <CpuDelete open={openDelete} onClose={onClose} />
      {cpus.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          rows={cpus}
          columns={columns}
          loading={isLoading}
          autoHeight
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getCpus(params.page, searchFileld)}
          rowCount={pagination.total}
          pageSize={pagination.perPage}
        />
      )}
    </>
  );
};

CpusTable.propTypes = {
  cpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getCpus: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setVisibilityCpu: PropTypes.func.isRequired,
  searchFileld: PropTypes.string,
};

CpusTable.defaultProps = {
  searchFileld: "",
};

const mapStateToProps = (state) => ({
  cpus: state.cpu.cpus,
  isLoading: state.cpu.isLoading,
  pagination: state.cpu.pagination,
  searchField: state.cpu.searchFileld,
});

export default connect(mapStateToProps, {
  getCpus: getCpusData,
  setCurrent: setCurrentCpu,
  setVisibilityCpu: setCpuVisibility,
})(CpusTable);
