import { handleActions } from "redux-actions";
import {
  clearError,
  logInFailed,
  getPsychsFailed,
  editPsychFailed,
  getClientsFailed,
  editClientFailed,
  banClientFailed,
  connectPsychToClientFailed,
  getScheduleFailed,
  makeAppointmentFailed,
  editAppointmentFailed,
  getPsychesPaymentsFailed,
  getClientsPaymentsFailed,
  addPaymentFailed,
  getClientScheduleFailed,
  getPsychScheduleFailed,
  getChartDataFailed
} from "../actions";

const initialState = {
  error: null
};

export const errorHandler = handleActions(
  {
    [clearError](state) {
      return { ...state, error: null };
    },
    // auth action
    [logInFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    // psychs action
    [getPsychsFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [editPsychFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    // clients action
    [getClientsFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [editClientFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [banClientFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [connectPsychToClientFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [getScheduleFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [makeAppointmentFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [editAppointmentFailed](state, { payload }) {
      return { ...state, error: payload };
    },
    [getPsychesPaymentsFailed](state, { payload }) {
      return { ...state, error: payload};
    },
    [getClientsPaymentsFailed](state, { payload }) {
      return { ...state, error: payload};
    },
    [addPaymentFailed](state, { payload }) {
      return { ...state, error: payload};
    },
    [getClientScheduleFailed](state, { payload }) {
      return { ...state, error: payload};
    },
    [getPsychScheduleFailed](state, { payload }) {
      return { ...state, error: payload};
    },
    [getChartDataFailed](state, { payload }) {
      return { ...state, error: payload};
    }
  },
  initialState
);
