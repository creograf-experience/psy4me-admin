import React from "react";
import "./Main.css";
import Title from "../Common/Title";
import {Charts} from "../Common/Charts";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10
  }
}));

export default function MainComponent() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title style={{margin: '0 auto'}} title={'Dashboard'}/>
      <Charts/>
    </div>
  );
}
