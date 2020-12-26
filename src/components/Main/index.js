import {connect} from "react-redux";
import MainComponent from "./Main";

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = {};

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);