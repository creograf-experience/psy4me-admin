import { handleActions } from "redux-actions";
import {
  logInRequest,
  logInSuccess,
  logInFailed,
  getPsychsRequest,
  getPsychsSuccess,
  getPsychsFailed,
  banPsychRequest,
  banPsychSuccess,
  banPsychFailed,
  getClientsRequest,
  getClientsSuccess,
  getClientsFailed,
  banClientRequest,
  banClientSuccess,
  banClientFailed,
  connectPsychToClientRequest,
  connectPsychToClientSuccess,
  connectPsychToClientFailed,
  getScheduleRequest,
  getScheduleSuccess,
  getScheduleFailed,
  getPsychesPaymentsRequest,
  getPsychesPaymentsSuccess,
  getPsychesPaymentsFailed,
  getClientsPaymentsRequest,
  getClientsPaymentsSuccess,
  getClientsPaymentsFailed,
  makeAppointmentRequest,
  makeAppointmentSuccess,
  makeAppointmentFailed,
  editAppointmentRequest,
  editAppointmentSuccess,
  editAppointmentFailed,
  addPaymentRequest,
  addPaymentSuccess,
  addPaymentFailed,
  getClientScheduleRequest,
  getClientScheduleSuccess,
  getClientScheduleFailed,
  getPsychScheduleRequest,
  getPsychScheduleSuccess,
  getPsychScheduleFailed,
  getChartDataRequest,
  getChartDataSuccess,
  getChartDataFailed
} from "../actions";

const initialState = {
  loading: false
};

export const loadingHandler = handleActions(
  {
    // auth actions
    [logInRequest](state) {
      return { ...state, loading: true };
    },
    [logInSuccess](state) {
      return { ...state, loading: false };
    },
    [logInFailed](state) {
      return { ...state, loading: false };
    },
    // psychs actions
    [getPsychsRequest](state) {
      return { ...state, loading: true };
    },
    [getPsychsSuccess](state) {
      return { ...state, loading: false };
    },
    [getPsychsFailed](state) {
      return { ...state, loading: false };
    },
    [banPsychRequest](state) {
      return { ...state, loading: true };
    },
    [banPsychSuccess](state) {
      return { ...state, loading: false };
    },
    [banPsychFailed](state) {
      return { ...state, loading: false };
    },
    // client actions
    [getClientsRequest](state) {
      return { ...state, loading: true };
    },
    [getClientsSuccess](state) {
      return { ...state, loading: false };
    },
    [getClientsFailed](state) {
      return { ...state, loading: false };
    },
    [banClientRequest](state) {
      return { ...state, loading: true };
    },
    [banClientSuccess](state) {
      return { ...state, loading: false };
    },
    [banClientFailed](state) {
      return { ...state, loading: false };
    },
    [connectPsychToClientRequest](state) {
      return { ...state, loading: true };
    },
    [connectPsychToClientSuccess](state) {
      return { ...state, loading: false };
    },
    [connectPsychToClientFailed](state) {
      return { ...state, loading: false };
    },
    [getScheduleRequest](state) {
      return { ...state, loading: true };
    },
    [getScheduleSuccess](state) {
      return { ...state, loading: false };
    },
    [getScheduleFailed](state) {
      return { ...state, loading: false };
    },
    [makeAppointmentRequest](state) {
      return { ...state, loading: true };
    },
    [makeAppointmentSuccess](state) {
      return { ...state, loading: false };
    },
    [makeAppointmentFailed](state) {
      return { ...state, loading: false };
    },
    [editAppointmentRequest](state) {
      return { ...state, loading: true };
    },
    [editAppointmentSuccess](state) {
      return { ...state, loading: false };
    },
    [editAppointmentFailed](state) {
      return { ...state, loading: false };
    },
    [getPsychesPaymentsRequest](state) {
      return { ...state, loading: true };
    },
    [getPsychesPaymentsSuccess](state) {
      return { ...state, loading: false };
    },
    [getPsychesPaymentsFailed](state) {
      return { ...state, loading: false };
    },
    [getClientsPaymentsRequest](state) {
      return { ...state, loading: true };
    },
    [getClientsPaymentsSuccess](state) {
      return { ...state, loading: false };
    },
    [getClientsPaymentsFailed](state) {
      return { ...state, loading: false };
    },
    [addPaymentRequest](state) {
      return { ...state, loading: true };
    },
    [addPaymentSuccess](state) {
      return { ...state, loading: false };
    },
    [addPaymentFailed](state) {
      return { ...state, loading: false };
    },
    [getClientScheduleRequest](state) {
      return { ...state, loading: true };
    },
    [getClientScheduleSuccess](state) {
      return { ...state, loading: false };
    },
    [getClientScheduleFailed](state) {
      return { ...state, loading: false };
    },
    [getPsychScheduleRequest](state) {
      return { ...state, loading: true };
    },
    [getPsychScheduleSuccess](state) {
      return { ...state, loading: false };
    },
    [getPsychScheduleFailed](state) {
      return { ...state, loading: false };
    },
    [getChartDataRequest](state) {
      return { ...state, loading: true };
    },
    [getChartDataSuccess](state) {
      return { ...state, loading: false };
    },
    [getChartDataFailed](state) {
      return { ...state, loading: false };
    },
  },
  initialState
);
