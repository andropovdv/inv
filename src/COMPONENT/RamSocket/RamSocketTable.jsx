import { DataGrid, ruRU } from "@material-ui/data-grid";
import React from "react";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
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

  const [openDelete, setDelete] = React.useState(false);

  const clickDelete = () => {
    setDelete(true);
  };

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать разъем",
      visibility: true,
    });
  };

  const onClose = () => {
    setDelete(false);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "socketRam", headerName: "Разъем RAM", flex: 1 },
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
      <RamSocketDelete open={openDelete} onClose={onClose} />
      {socketRams.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          loading={isLoading}
          rows={socketRams}
          columns={columns}
          autoHeight
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getSocketRam(params.page, searchField)}
          rowCount={pagination.error ? 0 : pagination.total}
          pageSize={pagination.perPage}
        />
      )}
    </>
  );
};

RamSocketTable.propTypes = {
  searchField: PropTypes.string,
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

RamSocketTable.defaultProps = {
  searchField: "",
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
