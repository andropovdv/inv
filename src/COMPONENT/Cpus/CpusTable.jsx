/* eslint-disable no-unused-vars */
import { IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { getCpusData, setCurrentCpu } from "../../BLL/cpuReducer";

const CpusTable = (props) => {
  const { cpus, isLoading, pagination, getCpus, setCurrent } = props;

  useEffect(() => {
    getCpus();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
    { field: "socketCpu", headerName: "Разъем", flex: 0.5 },
    {
      field: "action",
      width: 120,
      headerName: "Действия",
      renderCell: () => (
        <strong>
          <IconButton color="primary" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  const setRow = (idRow) => {
    const res = cpus.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={cpus}
            columns={columns}
            loading={isLoading}
            autoHeight
            density="compact"
            onSelectionChange={(select) => {
              setRow(select.rowIds);
            }}
            paginationMode="server"
            rowCount={pagination.total}
            pageSize={pagination.perPage}
          />
        </div>
      </div>
    </div>
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
};

const mapStateToProps = (state) => ({
  cpus: state.cpu.cpus,
  isLoading: state.cpu.isLoading,
  pagination: state.cpu.pagination,
});

export default connect(mapStateToProps, {
  getCpus: getCpusData,
  setCurrent: setCurrentCpu,
})(CpusTable);
