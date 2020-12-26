import React from "react";
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import {getStatusRus} from "../../../constants";
import {getRusField} from "../../../utils";

const useStyles = makeStyles((theme) => ({
  row: {
    height: 70,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.extralight
    }
  }
}));

export default function ScheduleTable({
                                        data,
                                        fields,
                                        tableStyle,
                                        userType,
                                        onOpenEditModal
                                      }) {
  const classes = useStyles();

  return (
    <Paper className={tableStyle}>

      <Table>
        <TableHead>
          <TableRow>
            {fields.map(field => (
              <TableCell key={field} align="center">
                {getRusField(field)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map(({_id, dateAndTime, psych, client, sum, duration, status, rateAndComment}) => (
            <TableRow key={_id} className={classes.row}>
              <TableCell align="center">
                {dateAndTime && dateAndTime.replace('T', ' ')}
              </TableCell>

              {(userType === 'client' || !userType) &&
              <TableCell align="center">
                {psych.name}
              </TableCell>}

              {(userType === 'psych' || !userType) &&
              <TableCell align="center">
                {client.name}
              </TableCell>}

              <TableCell align="center">
                {sum}
              </TableCell>

              <TableCell align="center">
                {duration}
              </TableCell>

              <TableCell align="center">
                {getStatusRus(status)}
              </TableCell>

              <TableCell align="center">
                {rateAndComment}
              </TableCell>

              <TableCell align="center">
                <Button
                  disabled={isEditButtonDisable(dateAndTime)}
                  variant="outlined"
                  onClick={() => onOpenEditModal(_id)}>
                  Редактировать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const isEditButtonDisable = (dateTime) =>
  new Date(dateTime).getTime() < new Date().getTime();

