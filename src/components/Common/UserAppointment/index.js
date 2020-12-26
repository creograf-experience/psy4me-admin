import {connect} from "react-redux";
import UserAppointmentComponent from "./UserAppointment";
import {editAppointment, closeModal, makeAppointment, openModal} from "../../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  psyches: state.psychs.psychs,
  clients: state.clients.clients,
  modalConfirmMakeAppointment:
  state.modalsController.CONFIRM_MAKE_APPOINTMENT,
  modalSuccessMakeAppointment:
  state.modalsController.SUCCESS_MAKE_APPOINTMENT,
  modalConfirmEditAppointment:
  state.modalsController.CONFIRM_EDIT_APPOINTMENT,
  modalSuccessEditAppointment:
  state.modalsController.SUCCESS_EDIT_APPOINTMENT
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  makeAppointment,
  editAppointment
};

export const UserAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAppointmentComponent);