/* eslint-disable react/forbid-prop-types */
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { NavLink } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      frexShrink: 0,
    },
  },
}));

const NodeView = (props) => {
  const { element } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const toogle = () => {
    setExpanded(!expanded);
  };

  const showNodes = () => {
    let arNodes = [];
    if (element.nodes && element.nodes.length > 0) {
      arNodes = element.nodes.map((el) => {
        return <NodeView element={el} />;
      });
    }
    return arNodes;
  };
  return (
    <>
      {element.nodes ? (
        <List component="nav" disablePadding>
          <ListItem button onClick={toogle}>
            <ListItemText primary={element.name} />
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
      ) : (
        <List component="nav" disablePadding>
          <ListItem button onClick={toogle} component={NavLink} to={element.to}>
            <ListItemText primary={element.name} />
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

NodeView.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string,
    nodes: PropTypes.any,
    // nodes: PropTypes.arrayOf({}),
    to: PropTypes.string,
  }).isRequired,
};

export default NodeView;
