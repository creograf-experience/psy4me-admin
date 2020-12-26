import { connect } from "react-redux";
import SideMenuComponent from "./SideMenu";

import { openModal, closeModal } from "../../actions";

const mapStateToProps = state => ({
  modalConfirmExit: state.modalsController.CONFIRM_EXIT
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export const SideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenuComponent);
