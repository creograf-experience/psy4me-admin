import React from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { Main } from "../Main";
import { Clients } from "../Clients/index";
import { Client } from "../Client/index";
import { Psych } from "../Psych/index";
import { Psychs } from "../Psychs/index";
import { SideMenu } from "../SideMenu/index";
import { MobileMenu } from "../Mobile-menu/index";
import { Schedule } from "../Schedule/index";
import { PaymentsFromClients } from "../PaymentsFromClients/index";
import { PaymentsToPsychologists } from "../PaymentsToPsychologists";

const Home = ({ classes }) => {
  return (
    <div className="home">
      <Route component={SideMenu} />
      <div className={classes.content}>
        <MobileMenu />
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/clients" component={Clients} />
          <Route path="/psychologists" component={Psychs} />
          <Route path="/client/:id" component={Client} />
          <Route path="/psych/:id" component={Psych} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/payments-from-clients" component={PaymentsFromClients} />
          <Route path="/payments-to-psychologists" component={PaymentsToPsychologists} />
        </div>
      </div>
    </div>
  );
};

const styles = theme => ({
  content: {
    "@media (min-width: 960px)": {
      marginLeft: 350
    }
  }
});

const HomeComponent = withStyles(styles)(Home);

export default HomeComponent;
