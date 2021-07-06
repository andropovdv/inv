import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  // TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";

const CustomTableCell = withStyles({
  root: {
    borderBottom: "none",
    paddingTop: 0,
    paddingBottom: 0,
  },
})(MuiTableCell);

const useStyles = makeStyles(() => ({
  row: {
    border: "none",
    height: 28,
    fontSize: 16,
  },
  root: {
    overflowX: "auto",
  },
}));

const InfoBlock = (props) => {
  const { rowInfo } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.root}>
      <Table size="small">
        <TableBody>
          {rowInfo.map((row) => (
            <TableRow key={row.name} className={classes.row}>
              <CustomTableCell>{row.name}</CustomTableCell>
              <CustomTableCell align="right">{row.val}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

InfoBlock.propTypes = {
  rowInfo: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      val: PropTypes.string,
    })
  ).isRequired,
};

export default InfoBlock;
