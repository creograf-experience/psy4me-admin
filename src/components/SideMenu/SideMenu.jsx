import React from "react";
import {
  List,
  ListItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import { removeTokenFromStorage } from "../../utils";
import { CONFIRM_EXIT } from "../../constants";

import { LogOut } from "../Common";
import routes from "../../routes/routes";
import logo from "../../assets/logo.png";
import backgroundImage from "../../assets/sidebar-bg.jpg";

const SideMenu = ({ classes, openModal, closeModal, modalConfirmExit }) => (
  <div className={classes.sideMenu}>
    <div className={classes.logo} />

    <LogOut className={classes.button} onClick={() => openModal(CONFIRM_EXIT)}>
      Выход
    </LogOut>

    <List className={classes.list}>
      {routes.map(route => {
        return (
          <NavLink
            exact
            to={route.path}
            key={route.path}
            activeStyle={{
              backgroundColor: "#00bcd4"
            }}
            className={classes.link}
          >
            <ListItem className={classes.listItem}>
              <Avatar className={classes.avatar}>
                <route.icon color="primary" />
              </Avatar>

              <div className={classes.listItemText}>{route.sidebarName}</div>
            </ListItem>
          </NavLink>
        );
      })}
    </List>

    <div className={classes.background} />

    <Dialog open={modalConfirmExit} onClose={() => closeModal(CONFIRM_EXIT)}>
      <DialogTitle>Вы действительно хотите выйти?</DialogTitle>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            closeModal(CONFIRM_EXIT);
            removeTokenFromStorage();
            document.location.reload(true);
          }}
        >
          Да
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            closeModal(CONFIRM_EXIT);
          }}
        >
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

const styles = theme => ({
  sideMenu: {
    display: "none",
    position: "fixed",
    width: 350,
    height: "100%",
    "@media (min-width: 960px)": {
      display: "block"
    }
  },
  logo: {
    position: "relative",
    height: 150,
    background: `url(${logo}) no-repeat 45%`,
    zIndex: 1
  },
  link: {
    display: "block",
    width: 270,
    margin: "0 40px",
    borderRadius: 3
  },
  button: {
    backgroundColor: theme.palette.error.main,
    position: "relative",
    zIndex: "1",
    marginLeft: 40,
    padding: 10
  },
  list: {
    position: "relative",
    zIndex: "1"
  },
  listItem: {
    display: "flex",
    margin: "10px 15px"
  },
  avatar: {
    backgroundColor: "white"
  },
  listItemText: {
    color: "white",
    marginLeft: 15
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    maxWidth: 350,
    height: "100%",
    background: `url(${backgroundImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
});

const SideMenuComponent = withStyles(styles)(SideMenu);

export default SideMenuComponent;
