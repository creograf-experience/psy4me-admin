import { connect } from "react-redux";
import PsychAppointmentComponent from "./PsychAppointment";

import { openModal, closeModal, connectPsychToClient } from "../../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  modalConfirmConnectPsychToClient:
    state.modalsController.CONFIRM_CONNECT_PSYCH_TO_CLIENT,
  modalSuccessConnectPsychToClient:
    state.modalsController.SUCCESS_CONNECT_PSYCH_TO_CLIENT
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  connectPsychToClient
};

export const PsychAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(PsychAppointmentComponent);
