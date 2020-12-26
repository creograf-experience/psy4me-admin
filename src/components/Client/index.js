import {connect} from "react-redux";
import ClientComponent from "./Client";

import {banClient, deleteClient, editClient, getClients, getClientSchedule, getPsychs, openModal} from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  clients: state.clients.clients,
  psychs: state.psychs.psychs,
  schedule: state.clients.schedule,
  totalCount: state.clients.totalCount
});

const mapDispatchToProps = {
  getClients,
  editClient,
  banClient,
  deleteClient,
  getPsychs,
  getClientSchedule,
  openModal,
};

export const Client = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientComponent);
