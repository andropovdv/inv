import { IconButton, LinearProgress, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import {
  getTypeOfGraphSlot,
  setCurrentTypeOfGraph,
} from "../../BLL/typeOfGraphSlotReducer";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";
import GraphSocketDelete from "./GraphSocketDelete";

const GraphSocketTable = (props) => {
  const {
    graphSockets,
    pagination,
    searchField,
    isLoading,

    getGraphSocket,
    setVisibilitySocket,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getGraphSocket(pagination.current, searchField);
  }, []);

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const clickEdit = () => {
    setVisibilitySocket({
      type: false,
      header: "Редактировать разъем",
      visibility: true,
    });
  };

  const handlePageChange = (params) => getGraphSocket(params.page, searchField);

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "socketGraph", headerName: "Разъем гр.карты", flex: 1 },
    {
      field: "action",
      width: 120,
      headerName: "Действия",
      renderCell: () => (
        <Box
          styles={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            frexGrow: 1,
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
      {graphSockets.length === 0 ? (
        <div>
          <LinearProgress color="primary" />
        </div>
      ) : (
        <>
          <DataGrid
            localeText={ruRU.props.MuiDataGrid.localeText}
            rows={graphSockets}
            columns={columns}
            loading={isLoading}
            autoHeight
            density="compact"
            onRowClick={(rowData) => setCurrent(rowData.row)}
            pagination="server"
            onPageChange={handlePageChange}
            rowCount={pagination.total}
            pageSize={pagination.perPage}
          />
          <GraphSocketDelete open={open} onClose={onClose} />
        </>
      )}
    </>
  );
};

GraphSocketTable.propTypes = {
  graphSockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      socketGraph: PropTypes.string,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  searchField: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,

  getGraphSocket: PropTypes.func.isRequired,
  setVisibilitySocket: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

GraphSocketTable.defaultProps = {
  searchField: "",
};

const mapStateToProps = (state) => ({
  searchField: state.typeOfGraphSlot.searchField,
  pagination: state.typeOfGraphSlot.pagination,
  graphSockets: state.typeOfGraphSlot.typeOfGraphSlot,
  isLoading: state.typeOfGraphSlot.isLoading,
});

export default connect(mapStateToProps, {
  getGraphSocket: getTypeOfGraphSlot,
  setVisibilitySocket: setTypeOfGraphSlotVisibility,
  setCurrent: setCurrentTypeOfGraph,
})(GraphSocketTable);
