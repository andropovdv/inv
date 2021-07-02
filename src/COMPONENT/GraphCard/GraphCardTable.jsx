import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, LinearProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GraphCardDelete from "./GraphCardDelete";
import {
  getGraphCardData,
  setCurrentGraphCard,
} from "../../BLL/graphCardReducer";
import { setGraphCardVisibility } from "../../BLL/modalWindowReducer";

const GraphCardTable = (props) => {
  const {
    isLoading,
    graphCard,
    pagination,
    searchField,
    getGraphCard,
    setVisibility,
    setCurrent,
  } = props;

  React.useEffect(() => {
    getGraphCard(pagination.current, searchField);
  }, []);

  const handleEdit = () => {
    setVisibility({
      type: false,
      header: "Редактировать графическую карту",
      visibility: true,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      getGraphCard(pagination.current + 1, searchField);
    } else {
      getGraphCard(pagination.current - 1, searchField);
    }
    setPage(params.page);
  };

  const setRow = (idRow) => {
    const res = graphCard.find((e) => e.id === parseInt(idRow, 10));
    setCurrent(res);
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
        <strong>
          <IconButton color="primary" size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  return (
    //
    <>
      {isLoading ? (
        <div>
          <LinearProgress color="primary" />
        </div>
      ) : (
        <>
          <GraphCardDelete open={open} onClose={onClose} />
          <DataGrid
            loading={isLoading}
            rows={graphCard}
            columns={columns}
            autoHeight
            density="compact"
            onSelectionChange={(sel) => {
              setRow(sel.rowIds);
            }}
            pagination="server"
            onPageChange={handlePageChange}
            rowCount={pagination.error ? 0 : pagination.total}
            pageSize={pagination.perPage}
          />
        </>
      )}
    </>
  );
};

GraphCardTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchField: PropTypes.string.isRequired,
  graphCard: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      vendor: PropTypes.string,
      model: PropTypes.string,
      socketGraph: PropTypes.string,
      volume: PropTypes.number,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  getGraphCard: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.graphCard.isLoading,
  graphCard: state.graphCard.graphCard,
  pagination: state.graphCard.pagination,
  searchField: state.graphCard.searchField,
});

export default connect(mapStateToProps, {
  getGraphCard: getGraphCardData,
  setVisibility: setGraphCardVisibility,
  setCurrent: setCurrentGraphCard,
})(GraphCardTable);
