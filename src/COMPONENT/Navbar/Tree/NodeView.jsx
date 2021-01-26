import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    list: {
        width: drawerWidth
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    toolBar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            frexShrink: 0
        }
    }
}))

const NodeView = (props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    let toogle = () => {
        setExpanded(!expanded);
    };

    let showNodes = () => {
        let arNodes = [];
        if (props.element.nodes && props.element.nodes.length > 0) {
            arNodes = props.element.nodes.map((element, index) => {
                return (
                    <NodeView key={index} element={element} />
                )
            });
        }
        return arNodes;

    };

    return (
            <>
            {props.element.nodes 
            ? (
                <List component="nav"  disablePadding>
                    <ListItem
                        button
                        onClick={toogle}
                    >
                        <ListItemText primary={props.element.name} />
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
    
                </List>
            )
            : (
                <List component="nav"  disablePadding>
                    <ListItem
                        button
                        onClick={toogle}
                        component={NavLink}
                        to={props.element.to}
                    >
                        <ListItemText primary={props.element.name} />
                    </ListItem>
    
                </List>
            )}
                
                {expanded && (
                    <div className={expanded ? classes.nested : null}>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            {showNodes()}
                        </Collapse>
                    </div>
                )}
            </>

    );

};

export default NodeView;
