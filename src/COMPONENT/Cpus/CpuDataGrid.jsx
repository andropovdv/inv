import { IconButton } from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid } from "@material-ui/data-grid";

const CpuDataGrid = (props) => {
  const {
    cpus,
    isLoading,
    pagination,
    prevPage,
    nextPage,
    setCurrent,
    clickEdit,
    clickDelete,
  } = props;
  const column = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
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
    const result = cpus.find((item) => item.id === parseInt(idRow, 10));
    setCurrent(result);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={column}
            rows={cpus}
            autoHeight
            density="compact"
            loading={isLoading}
            paginationMode="server"
            pageSize={10}
            rowCount={pagination.total}
            onPageChange={handlePageChange}
            onSelectionChange={(newSelection) => {
              setCurrentRow(newSelection.rowIds);
            }}
          />
        </div>
      </div>
    </div>
  );
};

CpuDataGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  prevPage: PropTypes.bool.isRequired,
  nextPage: PropTypes.bool.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
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
};

export default CpuDataGrid;
