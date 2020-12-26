import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppComponent from "./App";

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = {};

const App = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent)
);

export default App;
