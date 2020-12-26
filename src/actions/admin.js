import {createAction} from "redux-actions";
import {
  getSchedule as getScheduleFromServer,
  makeAppointment as makeAppointmentFromServer,
  editAppointment as editAppointmentFromServer,
  getPayments as getPaymentsFromServer,
  addPayment as addPaymentFromServer,
  getChartData as getChartDataFromServer
} from "../networkers";
import {closeModal, openModal} from "./modalController";
import {
  CONFIRM_EDIT_APPOINTMENT,
  SUCCESS_EDIT_APPOINTMENT,
  CONFIRM_MAKE_APPOINTMENT,
  SUCCESS_MAKE_APPOINTMENT,
  CONFIRM_ADD_PAYMENT,
  SUCCESS_ADD_PAYMENT,
} from "../constants";

export const getScheduleRequest = createAction("GET_SCHEDULE_REQUEST");
export const getScheduleSuccess = createAction("GET_SCHEDULE_SUCCESS");
export const getScheduleFailed = createAction("GET_SCHEDULE_FAILED");

export const getSchedule = (token, params) => async dispatch => {
  dispatch(getScheduleRequest());
  try {
    const response = await getScheduleFromServer(token, params);

    dispatch(getScheduleSuccess(response.data));
  } catch (e) {
    dispatch(getScheduleFailed(e.message));
  }
};

export const makeAppointmentRequest = createAction("MAKE_APPOINTMENT_REQUEST");
export const makeAppointmentSuccess = createAction("MAKE_APPOINTMENT_SUCCESS");
export const makeAppointmentFailed = createAction("MAKE_APPOINTMENT_FAILED");

export const makeAppointment = (token, couple) => async dispatch => {
  dispatch(closeModal(CONFIRM_MAKE_APPOINTMENT));
  dispatch(makeAppointmentRequest());

  try {
    const response = await makeAppointmentFromServer(token, couple);

    if (response.status === 0) {
      dispatch(openModal(SUCCESS_MAKE_APPOINTMENT));
    }
  } catch (e) {
    dispatch(makeAppointmentFailed(e.message));
  }
}

export const editAppointmentRequest = createAction("EDIT_APPOINTMENT_REQUEST");
export const editAppointmentSuccess = createAction("EDIT_APPOINTMENT_SUCCESS");
export const editAppointmentFailed = createAction("EDIT_APPOINTMENT_FAILED");

export const editAppointment = (token, request) => async dispatch => {
  dispatch(closeModal(CONFIRM_EDIT_APPOINTMENT));
  dispatch(editAppointmentRequest());

  try {
    const response = await editAppointmentFromServer(token, request);
    if (response.status === 0) {
      dispatch(openModal(SUCCESS_EDIT_APPOINTMENT));
    }
  } catch (e) {
    dispatch(editAppointmentFailed(e.message));
  }
}

export const getClientsPaymentsRequest = createAction("GET_CLIENTS_PAYMENTS_REQUEST");
export const getClientsPaymentsSuccess = createAction("GET_CLIENTS_PAYMENTS_SUCCESS");
export const getClientsPaymentsFailed = createAction("GET_CLIENTS_PAYMENTS_FAILED");

export const getClientsPayments = (token, params) => async dispatch => {
  dispatch(getClientsPaymentsRequest());
  try {
    const response = await getPaymentsFromServer(token, params);

    dispatch(getClientsPaymentsSuccess(response.data));
  } catch (e) {
    dispatch(getClientsPaymentsFailed(e.message));
  }
}

export const getPsychesPaymentsRequest = createAction("GET_PSYCHES_PAYMENTS_REQUEST");
export const getPsychesPaymentsSuccess = createAction("GET_PSYCHES_PAYMENTS_SUCCESS");
export const getPsychesPaymentsFailed = createAction("GET_PSYCHES_PAYMENTS_FAILED");

export const getPsychesPayments = (token, params) => async dispatch => {
  dispatch(getPsychesPaymentsRequest());
  try {
    const response = await getPaymentsFromServer(token, params);

    dispatch(getPsychesPaymentsSuccess(response.data));
  } catch (e) {
    dispatch(getPsychesPaymentsFailed(e.message));
  }
}

export const addPaymentRequest = createAction("ADD_PAYMENT_REQUEST");
export const addPaymentSuccess = createAction("ADD_PAYMENT_SUCCESS");
export const addPaymentFailed = createAction("ADD_PAYMENT_FAILED");

export const addPayment = (token, data) => async dispatch => {
  dispatch(closeModal(CONFIRM_ADD_PAYMENT));
  dispatch(addPaymentRequest());

  try {
    const response = await addPaymentFromServer(token, data);

    if (response.status === 0) {
      dispatch(openModal(SUCCESS_ADD_PAYMENT));
    }
  } catch (e) {
    dispatch(addPaymentFailed(e.message));
  }
}

export const getChartDataRequest = createAction("GET_CHART_DATA_REQUEST");
export const getChartDataSuccess = createAction("GET_CHART_DATA_SUCCESS");
export const getChartDataFailed = createAction("GET_CHART_DATA_FAILED");

export const getChartData = (token, request) => async dispatch => {
  dispatch(getChartDataRequest());

  try {
    const response = await getChartDataFromServer(token, request);

    dispatch(getChartDataSuccess(response.data));
  } catch (e) {
    dispatch(getChartDataFailed(e.message))
  }
}