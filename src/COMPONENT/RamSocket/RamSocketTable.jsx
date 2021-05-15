import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import {
  getTypeOfRamData,
  setCurrentTypeOfRam,
} from "../../BLL/typeOfRamReducer";
import { setTypeOfRamVisibility } from "../../BLL/modalWindowReducer";
import RamSocketDelete from "./RamSocketDelete";

const RamSocketTable = (props) => {
  const {
    socketRams,
    searchField,
    pagination,
    isLoading,
    getSocketRam,
    setVisibility,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getSocketRam(pagination.current, searchField);
  }, []);

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать разъем",
      visibility: true,
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      getSocketRam(pagination.current + 1, searchField);
    } else {
      getSocketRam(pagination.current - 1, searchField);
    }
    setPage(params.page);
  };

  const setRow = (idRow) => {
    const res = socketRams.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "socketRam", headerName: "Разъем RAM", flex: 1 },
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

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            loading={isLoading}
            rows={socketRams}
            columns={columns}
            autoHeight
            density="compact"
            onSelectionChange={(select) => {
              setRow(select.rowIds);
            }}
            paginationMode="server"
            onPageChange={handlePageChange}
            rowCount={pagination.error ? 0 : pagination.total}
            pageSize={pagination.perPage}
          />
          <RamSocketDelete open={open} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

RamSocketTable.propTypes = {
  searchField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  socketRams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketRam: PropTypes.string,
    })
  ).isRequired,

  getSocketRam: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.typeOfRam.isLoading,
  pagination: state.typeOfRam.pagination,
  searchField: state.typeOfRam.searchField,
  socketRams: state.typeOfRam.typeOfRam,
});

export default connect(mapStateToProps, {
  getSocketRam: getTypeOfRamData,
  setVisibility: setTypeOfRamVisibility,
  setCurrent: setCurrentTypeOfRam,
})(RamSocketTable);
