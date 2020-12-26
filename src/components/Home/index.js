import { connect } from "react-redux";
import HomeComponent from "./Home";

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = {};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
