import {connect} from "react-redux";
import ChartsComponent from "./Charts";
import {getChartData} from "../../../actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  charts: state.admin.charts
});

const mapDispatchToProps = {
  getChartData
};

export const Charts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsComponent);