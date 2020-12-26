import {connect} from "react-redux";
import MakeAppointmentComponent from "./MakeAppointment";
import {
  makeAppointment,
  closeModal,
  openModal
} from "../../../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  psychs: state.psychs.psychs,
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
  makeAppointment
};

export const MakeAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeAppointmentComponent);