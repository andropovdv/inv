import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';





const VendorsDataGrid = (props) => {

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'name', headerName: 'Наименование', flex: 0.5 },
        { field: 'full_name', headerName: 'Полное', flex: 1 },
        { field: 'url', headerName: 'URL', hide: true },
        {
            field: 'action',
            width: 120,
            headerName: 'Действия',
            renderCell: (params) => (
                <strong>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={props.clickEdit}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={props.clickDelete}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </strong>
            )
        }
    
    ];

    const [page, setPage] = React.useState(1);

    const handlePageChange = (params) => {
        if (params.page > page) {
            props.nextPage()
        } else {
            props.prevPage()
        }
        setPage(params.page)
    }

    const setCurrent = (id) => {
        let result = props.vendors.find(item => item.id_vendor === parseInt(id, 10));
        debugger
        props.setCurrentVendor(result)
    }

    return (

        <div style={{ height: 300, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={props.vendors}
                        columns={columns}
                        autoHeight
                        loading={props.isLoading}
                        density="compact"
                        onSelectionChange={(newSelection) => {
                            // alert(newSelection.rowIds);
                            setCurrent(newSelection.rowIds)
                        }}
                        paginationMode="server"
                        onPageChange={handlePageChange}
                        rowCount={props.pagination.total}
                        pageSize={3}
                    />
                </div>
            </div>
        </div>

    )
}

export default VendorsDataGrid;
