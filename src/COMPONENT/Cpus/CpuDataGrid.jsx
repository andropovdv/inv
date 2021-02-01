import { IconButton } from "@material-ui/core";
import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid } from "@material-ui/data-grid";

const CpuDataGrid = () => {
  const column = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
    { field: "name_typeSocketCpu", headerName: "Тип разъема", flex: 0.5 },
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
  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid columns={column} />
        </div>
      </div>
    </div>
  );
};

export default CpuDataGrid;
