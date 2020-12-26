import {connect} from "react-redux";
import PsychComponent from "./Psych";

import {getPsychs, editPsych, banPsych, deletePsych, getPsychSchedule, openModal, getClients} from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  psychs: state.psychs.psychs,
  schedule: state.psychs.schedule,
  totalCount: state.psychs.totalCount
});

const mapDispatchToProps = {
  getClients,
  getPsychs,
  editPsych,
  banPsych,
  deletePsych,
  getPsychSchedule,
  openModal,
};

export const Psych = connect(
  mapStateToProps,
  mapDispatchToProps
)(PsychComponent);
