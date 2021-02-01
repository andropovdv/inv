import { CssBaseline, Drawer, Hidden } from '@material-ui/core';
import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Node from './Tree/Node';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth
    }
}))

const navData = [
    {
        key: '0',
        label: 'Справочники',
        to: "",
        children: [
            {
                key: '0-0',
                label: 'Типы разъемов',
                to: "",
                children: [
                    {
                        key: '0-0-1',
                        label: 'Тип разъема процессора',
                        to: '/CpuSocket'
                    },
                    {
                        key: '0-0-2',
                        label: 'Тип оперативной памяти',
                        to: '/TypeOfRam'
                    },
                    {
                        key: '0-0-3',
                        label: 'Тип графического разъема',
                        to: '/TypeOfGraphSlot'
                    },
                    {
                        key: '0-0-4',
                        label: 'Форм фактор',
                        to: '/FormFactor'
                    },
                ]
            },
            {
                key: '0-1',
                to: '/Vendors',
                label: 'Производители',
            },
            {
                key: '0-1',
                to: '/Cpus',
                label: 'Процессоры',
            },
            {
                key: '0-2',
                to: '/MBoards',
                label: 'Материнские платы',
            },
            {
                key: '0-3',
                to: '/GraphCard',
                label: 'Графические платы',
            },
        ]
    },
    {
        key: '1',
        label: 'Операции',
        to: "",
        children: [
            {
                key: '1-1',
                to: '/Rams',
                label: 'Поступление'
            }
        ]
    }
];

const Navbar = (props) => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <Hidden smUp implementation="css">
                <Drawer
                    open={props.openLeft}
                    onClose={props.handleClose}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <Node />
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent">
                    <div><Node /></div>
                </Drawer>
            </Hidden>
        </>
        // <div className={s.appWrapperNavbar}>
        //     <div className={s.contentCenter}>
        //         <Tree data={navData} />
        //     </div>
        // </div>
    )
}

export default Navbar;