import {connect} from "react-redux";

import ScheduleComponent from "./Schedule";
import {
  getSchedule,
  getPsychs,
  getClients,
  editAppointment,
  openModal,
} from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  schedule: state.admin.schedule,
  totalCount: state.admin.totalCount,
  psychs: state.psychs.psychs,
  clients: state.clients.clients
});

const mapDispatchToProps = {
  getPsychs,
  getClients,
  getSchedule,
  editAppointment,
  openModal
};

export const Schedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleComponent);