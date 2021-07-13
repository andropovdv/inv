import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { getMboardData, setCurrentMboard } from "../../BLL/mboardReducer";
import { setMboardVisibility } from "../../BLL/modalWindowReducer";
import MBoardDelete from "./MBoardDelete";

const MBoardTable = (props) => {
  const {
    searchField,
    mboard,
    pagination,
    isLoading,
    getMboard,
    setVisibility,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getMboard(pagination.current, searchField);
  }, []);

  const clickEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать материнскую плату",
      visibility: true,
    });
  };

  const [openDelete, setDelete] = React.useState(false);

  const clickDelete = () => {
    setDelete(true);
  };

  const onClose = () => {
    setDelete(false);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "vendor", headerName: "Производитель", flex: 0.5 },
    { field: "model", headerName: "Модель", flex: 1 },
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
      <MBoardDelete open={openDelete} onClose={onClose} />
      {mboard.length === 0 ? (
        <div>
          <LinearProgress />
        </div>
      ) : (
        <DataGrid
          localeText={ruRU.props.MuiDataGrid.localeText}
          loading={isLoading}
          rows={mboard}
          columns={columns}
          autoHeight
          density="compact"
          onRowClick={(rowData) => setCurrent(rowData.row)}
          paginationMode="server"
          onPageChange={(params) => getMboard(params.page, searchField)}
          rowCount={pagination.error ? 0 : pagination.total}
          pageSize={pagination.perPage}
        />
      )}
    </>
  );
};

MBoardTable.propTypes = {
  searchField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  mboard: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
      intGraph: PropTypes.bool,
      socketRam: PropTypes.string,
      quantitySocketRam: PropTypes.number,
      socketGraph: PropTypes.string,
      quantityPCI: PropTypes.number,
      quantityPCIE: PropTypes.number,
      quantitySATA: PropTypes.number,
      formFactor: PropTypes.string,
      intLAN: PropTypes.bool,
      intSound: PropTypes.bool,
    })
  ).isRequired,
  getMboard: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pagination: state.mboard.pagination,
  searchField: state.mboard.searchField,
  isLoading: state.mboard.isLoading,
  mboard: state.mboard.mboard,
});

export default connect(mapStateToProps, {
  getMboard: getMboardData,
  setVisibility: setMboardVisibility,
  setCurrent: setCurrentMboard,
})(MBoardTable);
