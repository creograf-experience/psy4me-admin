import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemText} from "@material-ui/core";
import {meetingStatus} from "../../../constants";
import StopIcon from '@material-ui/icons/Stop';

const useStyles = makeStyles({
  statusList: {
    padding: 0,
    margin: 0
  },
  item: {
    padding: 0,
    margin: 0
  }
});

const statuses = [
  {
    name: meetingStatus.ASSIGNED,
    color: "lightgrey"
  },
  {
    name: meetingStatus.CLIENT_DO_NOT_COME,
    color: "orange"
  },
  {
    name: meetingStatus.PSYCH_DO_NOT_COME,
    color: "red"
  },
  {
    name: meetingStatus.POSTPONED,
    color: "yellow"
  },
  {
    name: meetingStatus.CONSULTATION_TOOK_PLACE,
    color: "green"
  },
  {
    name: meetingStatus.CANCELED,
    color: "#f5427b"
  }
];

export default () => {
  const classes = useStyles();

  return (
    <List className={classes.statusList}>
      {statuses.map(({name, color}) => (
        <ListItem key={name} className={classes.item}>
          <StopIcon style={{fill: color, width: 48, height: 48}}/>
          <ListItemText primary={name}/>
        </ListItem>
      ))}
    </List>
  )
};