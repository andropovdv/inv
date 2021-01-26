import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}))

const VendorTable = (props) => {

    const classes = useStyles();

    const [selected, setSelected] = React.useState([]);

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected[0] = id;
        }

        let result = props.vendors.find(item => item.id_vendor === id);
        setSelected(newSelected);
        // alert(result.name)
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <TableContainer>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Наименование</TableCell>
                        <TableCell>Полное</TableCell>
                        <TableCell align="center">Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.vendors.map((row) => {
                        const isItemSelected = isSelected(row.id_vendor)
                        return (
                            <TableRow
                                key={row.id_vendor}
                                hover
                                onClick={() => handleClick(row.id_vendor)}
                                selected={isItemSelected}
                            >
                                <TableCell component="th" scope="row" width="20%">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.full_name}</TableCell>
                                <TableCell align="center" width="20%">
                                    <Box>
                                        <IconButton color="primary" size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton color="secondary" size="small">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Box>
            </Box>
        </TableContainer>
    )
}

export default VendorTable;