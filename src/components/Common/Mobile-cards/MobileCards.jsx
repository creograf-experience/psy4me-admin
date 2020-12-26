import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

import {url} from "../../../constants";
import {getRusField} from "../../../utils";
import defaultImage from "../../../assets/default-avatar.png";

const MobileCardsComponent = ({
                                data,
                                headerField,
                                fields,
                                linkTo,
                                classes,
                              }) => {
  return (
    <>
      <div className={classes.container}>
        {data && data.map(item => {
          const avatar = (
            <Avatar
              className={classes.avatar}
              src={`${url}/photos/psych/${item._id}/avatar/avatar_${
                item._id
              }.jpg`}
              onError={e => (e.target.src = defaultImage)}
              alt=""
            />
          );

          return (
            <Card key={item._id} className={classes.card}>
              <div className={classes.header}>
                {headerField === "avatar" ? avatar : null}

                {item.lastName ?
                  <Typography variant="h6">{`${item.lastName} ${
                    item.firstName[0]
                  }. ${item.middleName[0]}.`}</Typography>
                  : null}
              </div>

              {item.lastName ? <hr className={classes.hr}/> : null}

              <CardContent>
                {fields.map(field => {
                  switch (field) {
                    case "photo":
                      return null;
                    case "button":
                      return (
                        <Link to={`${linkTo}/${item._id}`} key={field}>
                          <Button variant="outlined">Редакт.</Button>
                        </Link>
                      );
                    default:
                      return (
                        <div className={classes.row} key={field}>
                          <div>{getRusField(field)}</div>

                          <div>{item[field]}</div>
                        </div>
                      );
                  }
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

const styles = theme => ({
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
  header: {
    display: "flex",
    alignItems: "center"
  },
  hr: {
    margin: "10px 20px"
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 20
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  }
});

export const MobileCards = withStyles(styles)(MobileCardsComponent);
