import { connect } from "react-redux";
import MobileMenuComponent from "./MobileMenu";

import { openModal, closeModal } from "../../actions";

const mapStateToProps = state => ({
  modalConfirmExit: state.modalsController.CONFIRM_EXIT
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export const MobileMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenuComponent);
