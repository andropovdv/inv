import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
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

  const [open, setOpen] = React.useState(false);

  const clickDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [page, setPage] = React.useState(1);

  const handlePageChange = (params) => {
    if (params.page > page) {
      getMboard(pagination.current + 1, searchField);
    } else {
      getMboard(pagination.current - 1, searchField);
    }
    setPage(params.page);
  };

  const setRow = (idRow) => {
    const res = mboard.find((e) => e.id === parseInt(idRow, 10));
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
            rows={mboard}
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
          <MBoardDelete open={open} onClose={onClose} />
        </div>
      </div>
    </div>
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
