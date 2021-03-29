import { IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import {
  setCurrentSocketCpu,
  getSocketCpuData,
} from "../../BLL/typeSocketCpuReducer";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";
import CpuSocketDelete from "./CpuSocketDelete";

const CpuSocketTable = (props) => {
  const {
    socketCpus,
    getSocketCpu,
    setCurrent,
    pagination,
    isLoading,
    setVisibility,
  } = props;

  React.useState(() => {
    getSocketCpu();
  }, []);

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
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

  const setRow = (idRow) => {
    const res = socketCpus.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
  };
  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            loading={isLoading}
            rows={socketCpus}
            columns={columns}
            autoHeight
            density="compact"
            onSelectionChange={(select) => {
              setRow(select.rowIds);
            }}
            paginationMode="server"
            rowCount={pagination.total}
            pageSize={pagination.perPage}
          />
          <CpuSocketDelete open={open} onClose={onClose} />
        </div>
      </div>
    </div>
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
  }).isRequired,
  setCurrent: PropTypes.func.isRequired,
  getSocketCpu: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  socketCpus: state.typeCpuSocket.cpuSockets,
  pagination: state.typeCpuSocket.pagination,
  isLoading: state.typeCpuSocket.isLoading,
});

export default connect(mapStateToProps, {
  getSocketCpu: getSocketCpuData,
  setCurrent: setCurrentSocketCpu,
  setVisibility: setCpuSoketVisibility,
})(CpuSocketTable);
