import React from "react";
import {Link} from "react-router-dom";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {url} from "../../../constants";
import {getRusField} from "../../../utils";
import defaultImage from "../../../assets/default-avatar.png";

export const TableComponent = ({
                                 data,
                                 fields,
                                 linkTo,
                                 classes,
                                 tableStyle, // each table has different quantity of fields => need to use different styles
                               }) => {
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
          {data && data.map(item => {
            return (
              <TableRow key={item._id} className={classes.row}>
                {fields.map(field => {
                  switch (field) {
                    case "photo":
                      return (
                        <TableCell key={field} align="center">
                          <Avatar
                            className={classes.avatar}
                            src={`${url}/photos/psych/${item._id}/avatar/avatar_${item._id}.jpg`}
                            onError={e => (e.target.src = defaultImage)}
                            alt=""
                          />
                        </TableCell>
                      );
                    case "fullName":
                      return (
                        <TableCell key={field} align="center">
                          {`${item["lastName"]}  
                          ${item["firstName"] ? item["firstName"][0] + '.' : ''} 
                          ${item["middleName"] ? item["middleName"][0] + '.' : ''}`}
                        </TableCell>
                      );
                    case "psych":
                      return (
                        <TableCell key={field} align="center">
                          {item[field] ? item[field] : "не назначен"}
                        </TableCell>
                      );
                    case "button":
                      return (
                        <TableCell key={field} align="center">
                          <Link to={`${linkTo}/${item._id}`} key={field}>
                            <Button variant="outlined">Редакт.</Button>
                          </Link>
                        </TableCell>
                      );
                    default:
                      return (
                        <TableCell key={field} align="center">
                          {item[field]}
                        </TableCell>
                      );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

const styles = theme => ({
  row: {
    height: 70,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.extralight
    }
  }
});

export const PersonTable = withStyles(styles)(TableComponent);
