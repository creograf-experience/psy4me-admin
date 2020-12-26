import {handleActions} from "redux-actions";

import {
  getChartDataSuccess,
  getClientsPaymentsSuccess,
  getPsychesPaymentsSuccess,
  getScheduleSuccess
} from "../actions";

const initialState = {
  schedule: [],
  totalCount: 0,
  totalPages: 0,
  clientsPayments: [],
  clientsTotalPaymentsCount: 0,
  psychesPayments: [],
  psychesTotalPaymentsCount: 0,
  charts: []
};

export const admin = handleActions(
  {
    [getScheduleSuccess](state, {payload}) {
      return {
        ...state,
        schedule: payload.schedule,
        totalCount: payload.totalCount,
        totalPages: payload.totalPages
      };
    },
    [getClientsPaymentsSuccess](state, {payload}) {
      return {
        ...state,
        clientsPayments: payload.payments,
        clientsTotalPaymentsCount: payload.totalCount,
      }
    },
    [getPsychesPaymentsSuccess](state, {payload}) {
      return {
        ...state,
        psychesPayments: payload.payments,
        psychesTotalPaymentsCount: payload.totalCount,
      }
    },
    [getChartDataSuccess](state, {payload}) {
      return {
        ...state,
        charts: payload.charts
      }
    }
  },
  initialState
);