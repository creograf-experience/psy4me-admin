import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { MobileCards, PersonTable } from "../Common";

class Clients extends Component {
  state = {
    clients: []
  };

  componentDidMount() {
    this.props.getClients(this.props.token);
  }

  render() {
    const { clients, classes } = this.props;
    return (
      <div className={classes.clients}>
        <Typography variant="h5" className={classes.title}>
          Клиенты
        </Typography>
        <div className="search">
          <TextField variant="outlined" placeholder={"ФИО, email, телефон"} />
        </div>

        <MobileCards
          data={clients}
          headerField={"avatar"}
          fields={["email", "phoneMask", "city", "country", "button"]}
          linkTo={"/client"}
        />

        <PersonTable
          data={clients}
          fields={[
            "photo",
            "fullName",
            "email",
            "phoneMask",
            "city",
            "country",
            "button"
          ]}
          linkTo={"/client"}
          tableStyle={classes.tableStyle}
        />
      </div>
    );
  }
}

const styles = theme => ({
  clients: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  title: {
    margin: 10
  },
  tableStyle: {
    display: "none",
    margin: 10,
    "@media (min-width: 1485px)": {
      display: "block"
    }
  }
});

const ClientsComponent = withStyles(styles)(Clients);

export default ClientsComponent;
