import React from "react";
import {Button, Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import {getStatusRus} from "../../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width: 1310px)": {
      flexFlow: "row wrap",
      width: 940,
      margin: "0 auto"
    },
    "@media (min-width: 1485px)": {
      display: "none"
    }
  },
  card: {
    width: "100%",
    maxWidth: 450,
    margin: 10
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  }
}));


export default function ScheduleMobileCards({data, userType, onOpenEditModal}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {data && data.map(({_id, dateAndTime, psych, client, sum, duration, status, rateAndComment}) => (
        <Card key={_id} className={classes.card}>
          <CardContent>
            <div className={classes.row}>
              <Typography variant="subtitle2">Время</Typography>
              <div>{dateAndTime && dateAndTime.replace('T', ' ')}</div>
            </div>
            {(userType === 'client' || !userType) &&
            <div className={classes.row}>
              <Typography variant="subtitle2">Психолог</Typography>
              <div>{psych && psych.name}</div>
            </div>}
            {(userType === 'psych' || !userType) &&
            <div className={classes.row}>
              <Typography variant="subtitle2">Клиент</Typography>
              <div>{client && client.name}</div>
            </div>}
            <div className={classes.row}>
              <Typography variant="subtitle2">Сумма</Typography>
              <div>{sum}</div>
            </div>
            <div className={classes.row}>
              <Typography variant="subtitle2">Длительнось</Typography>
              <div>{duration}</div>
            </div>
            <div className={classes.row}>
              <Typography variant="subtitle2">Статус</Typography>
              <div>{getStatusRus(status)}</div>
            </div>
            <div className={classes.row}>
              <Typography variant="subtitle2">Оценка и комментарий</Typography>
              <div>{rateAndComment}</div>
            </div>
            <div className={classes.row} style={{marginBottom: 0}}>
              <Button
                disabled={isEditButtonDisable(dateAndTime)}
                size="small"
                variant="outlined"
                onClick={() => onOpenEditModal(_id)}>
                Редактировать
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const isEditButtonDisable = (dateTime) =>
  new Date(dateTime).getTime() < new Date().getTime();
