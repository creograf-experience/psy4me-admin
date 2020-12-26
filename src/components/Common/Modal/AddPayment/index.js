import {connect} from "react-redux";

import {closeModal, addPayment, openModal} from "../../../../actions";
import AddPaymentComponent from "./AddPayment";

const mapStateToProps = state => ({
  token: state.auth.token,
  modalConfirmAddPayment:
  state.modalsController.CONFIRM_ADD_PAYMENT,
  modalSuccessAddPayment:
  state.modalsController.SUCCESS_ADD_PAYMENT
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  addPayment
};

export const AddPayment = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentComponent);