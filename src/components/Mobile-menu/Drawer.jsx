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

import { CONFIRM_EXIT } from "../../constants";
import { removeTokenFromStorage } from "../../utils";
import { LogOut } from "../Common";
import routes from "../../routes/routes";
import background from "../../assets/sidebar-bg.jpg";

export const Drawer = ({
  classes,
  handleToggleDrawer,
  modalConfirmExit,
  openModal,
  closeModal
}) => (
  <List className={classes.list}>
    {routes.map(route => (
      <NavLink
        exact
        to={route.path}
        key={route.path}
        className={classes.navLink}
        activeStyle={{
          backgroundColor: "#00bcd4"
        }}
        onClick={handleToggleDrawer}
      >
        <ListItem className={classes.listItem}>
          <Avatar className={classes.avatar}>
            <route.icon color="primary" />
          </Avatar>

          <div className={classes.listItemText}>{route.sidebarName}</div>
        </ListItem>
      </NavLink>
    ))}

    <LogOut className={classes.exit} onClick={() => openModal(CONFIRM_EXIT)}>
      Выход
    </LogOut>

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
  </List>
);

const styles = theme => ({
  list: {
    position: "relative",
    height: "100%",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  navLink: {
    display: "block",
    width: 270,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 3
  },
  avatar: {
    backgroundColor: "white"
  },
  listItemText: {
    color: "white",
    marginLeft: 15,
    fontFamily: "Roboto, sans-serif",
    fontSize: 18
  },
  exit: {
    marginTop: 10,
    marginLeft: 25
  }
});

export const DrawerComponent = withStyles(styles)(Drawer);
