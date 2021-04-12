import { IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
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

  useEffect(() => {
    getCpus();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const clickDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const clickEdit = () => {
    setVisibilityCpu({
      type: false,
      header: "Редактировать процессор",
      visibility: true,
    });
  };

  const handlePageChange = (params) => {
    if (params.page > page) {
      getCpus(pagination.current + 1, searchFileld);
    } else {
      getCpus(pagination.current - 1, searchFileld);
    }
    setPage(params.page);
  };

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
            onPageChange={handlePageChange}
            rowCount={pagination.total}
            pageSize={pagination.perPage}
          />
          <CpuDelete open={open} onClose={onClose} />
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
  seacrhField: state.cpu.searchFileld,
});

export default connect(mapStateToProps, {
  getCpus: getCpusData,
  setCurrent: setCurrentCpu,
  setVisibilityCpu: setCpuVisibility,
})(CpusTable);
