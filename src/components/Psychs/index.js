import { connect } from "react-redux";
import PsychsComponent from "./Psychs";

import { getPsychs } from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  psychs: state.psychs.psychs
});

const mapDispatchToProps = {
  getPsychs
};

export const Psychs = connect(
  mapStateToProps,
  mapDispatchToProps
)(PsychsComponent);
