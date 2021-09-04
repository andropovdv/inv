import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import CpusUI from "./Cpus/CpusUI";
import CpuSocketUI from "./CpuSocket/CpuSocketUI";
import VendorUI from "./Vendors/VendorUI";
import GraphSocketUI from "./GraphSocket/GraphSocketUI";
import RamSocketUI from "./RamSocket/RamSocketUI";
import FormFactorUI from "./FormFactor/FormFactorUI";
import MBoardUI from "./MBoard/MBoardUI";
import GraphCardUI from "./GraphCard/GraphCardUI";
import Login from "./Login/Login";
import SdSocketUI from "./SdSocket/SdSocketUI";
import FormFactorSDUI from "./FormFactorSD/FormFactorSDUI";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolBar: theme.mixins.toolbar,
}));

const First = () => {
  const classes = useStyles();

  const [openLeft, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleOpen={handleOpen} />
      <nav>
        <Navbar openLeft={openLeft} handleClose={handleClose} />
      </nav>
      <main className={classes.mainContent}>
        <div className={classes.toolBar} />
        <Route path="/Vendors" render={() => <VendorUI />} />
        <Route path="/Cpus" render={() => <CpusUI />} />
        <Route path="/CpuSockets" render={() => <CpuSocketUI />} />
        <Route path="/GraphSockets" render={() => <GraphSocketUI />} />
        <Route path="/RamSockets" render={() => <RamSocketUI />} />
        <Route path="/FormFactor" render={() => <FormFactorUI />} />
        <Route path="/MBoard" render={() => <MBoardUI />} />
        <Route path="/GraphCard" render={() => <GraphCardUI />} />
        <Route path="/Login" render={() => <Login />} />
        <Route path="/SdSocket" render={() => <SdSocketUI />} />
        <Route path="/SdFactor" render={() => <FormFactorSDUI />} />
      </main>
    </div>
  );
};

export default First;
