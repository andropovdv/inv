/* eslint-disable react/no-array-index-key */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import NodeView from "./NodeView";

const useStyles = makeStyles((theme) => ({
  toolBar: theme.mixins.toolbar,
}));

const items = {
  nodes: [
    {
      id: "01",
      name: "Справочники",
      nodes: [
        {
          id: "011",
          name: "Типы разъемов",
          nodes: [
            {
              id: "0111",
              name: "Разъем процессора",
              to: "/CpuSockets",
            },
            {
              id: "0112",
              name: "Разъем RAM",
              to: "/Vendors",
            },
            {
              id: "0113",
              name: "Разъем графического адаптера",
              to: "/Vendors",
            },
            {
              id: "0114",
              name: "Форм-фактор",
              to: "/Vendors",
            },
          ],
        },
        {
          id: "abc_172.22.22.214.if.3",
          name: "Производители",
          to: "/Vendors",
        },
        {
          id: "abc_172.22.22.214.if.2",
          name: "Процессоры",
          to: "/Cpus",
        },
        {
          id: "abc_172.22.22.214.if.2",
          name: "Материнские платы",
          to: "/Vendors",
        },
        {
          id: "abc_172.22.22.214.if.2",
          name: "Графические платы",
          to: "/Vendors",
        },
        {
          id: "abc_172.22.22.214.if.2",
          name: "Процессоры",
          to: "/Vendors",
        },
      ],
    },
    {
      id: "MON_LOGS_192.168.1.53",
      name: "Операции",
      nodes: [
        {
          id: "MON_LOGS_192.168.1.53.if.1",
          name: "lo",
          to: "/Vendors",
        },
        {
          id: "MON_LOGS_192.168.1.53.if.2",
          name: "eth0",
          to: "/Vendors",
        },
      ],
    },
  ],
};

const Node = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolBar}>v.0.0.0.1.5</div>
      <Divider />
      {items.nodes.map((element, index) => (
        <NodeView key={index} element={element} />
      ))}
    </div>
  );
};

export default Node;
