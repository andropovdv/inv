import React from 'react';
import NodeView from './NodeView'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core';

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    toolBar: theme.mixins.toolbar
}))

const items = {
    "nodes": [
        {
            "id": "abc_172.22.22.214",
            "name": "abc",
            "nodes": [
                {
                    "id": "abc_172.22.22.214.if.1",
                    "name": "Нода 1"
                },
                {
                    "id": "abc_172.22.22.214.if.3",
                    "name": "Нода 2"
                },
                {
                    "id": "abc_172.22.22.214.if.2",
                    "name": "Нода 3"
                }
            ]
        },
        {
            "id": "MON_LOGS_192.168.1.53",
            "name": "MON_LOGS",
            "nodes": [
                {
                    "id": "MON_LOGS_192.168.1.53.if.1",
                    "name": "lo"
                },
                {
                    "id": "MON_LOGS_192.168.1.53.if.2",
                    "name": "eth0"
                }
            ]
        }
    ]
}



const Node = () => {

    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolBar}>v.0.0.0.1.5</div>
            <Divider/>
            {items.nodes.map((element, index) => <NodeView key={index} element={element} />)}
        </div>
    )
}


export default Node;