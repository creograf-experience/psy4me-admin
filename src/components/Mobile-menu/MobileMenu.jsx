import React, { Component } from "react";
import { IconButton, Drawer } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/icons/Menu";

import { DrawerComponent } from "./Drawer";

class MobileMenu extends Component {
  state = {
    openDrawer: false
  };

  handleToggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mobileMenu}>
        <span className={classes.mobileMenuIcon}>
          <IconButton onClick={this.handleToggleDrawer}>
            <Menu />
          </IconButton>
        </span>

        <Drawer open={this.state.openDrawer} onClose={this.handleToggleDrawer}>
          <DrawerComponent
            handleToggleDrawer={this.handleToggleDrawer}
            modalConfirmExit={this.props.modalConfirmExit}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
          />
        </Drawer>
      </div>
    );
  }
}

const styles = theme => ({
  mobileMenu: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    "@media (min-width: 960px)": {
      display: "none"
    }
  }
});

const MobileMenuComponent = withStyles(styles)(MobileMenu);

export default MobileMenuComponent;
