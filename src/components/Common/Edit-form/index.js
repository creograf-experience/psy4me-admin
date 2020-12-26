import { connect } from "react-redux";
import EditFormComponent from "./EditForm";

import { openModal, closeModal } from "../../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  // psych modals
  editPsychSuccessModal: state.modalsController.EDIT_PSYCH_SUCCESS,
  editPsychFailedModal: state.modalsController.EDIT_PSYCH_FAILED,
  banPsychSuccessModal: state.modalsController.BAN_PSYCH_SUCCESS,
  banPsychFailedModal: state.modalsController.BAN_PSYCH_FAILED,
  confirmDeletePsych: state.modalsController.CONFIRM_DELETE_PSYCH,
  deletePsychSuccessModal: state.modalsController.DELETE_PSYCH_SUCCESS,
  deletePsychFailedModal: state.modalsController.DELETE_PSYCH_FAILED,
  // client modals
  editClientSuccessModal: state.modalsController.EDIT_CLIENT_SUCCESS,
  editClientFailedModal: state.modalsController.EDIT_CLIENT_FAILED,
  banClientSuccessModal: state.modalsController.BAN_CLIENT_SUCCESS,
  banClientFailedModal: state.modalsController.BAN_CLIENT_FAILED,
  confirmDeleteClient: state.modalsController.CONFIRM_DELETE_CLIENT,
  deleteClientSuccessModal: state.modalsController.DELETE_CLIENT_SUCCESS,
  deleteClientFailedModal: state.modalsController.DELETE_CLIENT_FAILED
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

export const EditForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormComponent);
