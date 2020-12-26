import {connect} from "react-redux";
import {getClients, getClientsPayments} from "../../actions";
import PaymentsFromClientsComponent from "./PaymentsFromClients";

const mapStateToProps = state => ({
  token: state.auth.token,
  payments: state.admin.clientsPayments,
  totalCount: state.admin.clientsTotalPaymentsCount,
  clients: state.clients.clients,
});

const mapDispatchToProps = {
  getPayments: getClientsPayments,
  getClients
};

export const PaymentsFromClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsFromClientsComponent);
