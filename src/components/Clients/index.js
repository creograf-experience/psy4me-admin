import { connect } from "react-redux";
import ClientsComponent from "./Clients";

import { getClients } from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  clients: state.clients.clients
});

const mapDispatchToProps = {
  getClients
};

export const Clients = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsComponent);
