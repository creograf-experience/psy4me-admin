import { connect } from "react-redux";
import LoginComponent from "./Login";

import { logIn, closeModal } from "../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  modal: state.modalsController.AUTH_ERROR
});

const mapDispatchToProps = {
  logIn,
  closeModal
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
