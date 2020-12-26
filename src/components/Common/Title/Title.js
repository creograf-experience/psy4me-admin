import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {},
});

export default ({title, style}) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" style={style} className={classes.title}>
      {title}
    </Typography>
  );
};