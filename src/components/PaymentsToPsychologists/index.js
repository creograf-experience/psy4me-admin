import {connect} from "react-redux";
import {getPsychs, getPsychesPayments} from "../../actions";
import PaymentsToPsychologistsComponent from "./PaymentsToPsychologists";

const mapStateToProps = state => ({
  token: state.auth.token,
  payments: state.admin.psychesPayments,
  totalCount: state.admin.psychesTotalPaymentsCount,
  psychs: state.psychs.psychs,
});

const mapDispatchToProps = {
  getPayments: getPsychesPayments,
  getPsychs
};

export const PaymentsToPsychologists = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsToPsychologistsComponent);
