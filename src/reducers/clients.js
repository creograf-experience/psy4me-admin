import { handleActions } from "redux-actions";

import { getClientsSuccess, getClientScheduleSuccess } from "../actions";

const initialState = {
  clients: [],
  schedule: [],
  totalCount: 0,
};

export const clients = handleActions(
  {
    [getClientsSuccess](state, { payload }) {
      return { ...state, clients: payload };
    },
    [getClientScheduleSuccess](state, { payload }) {
      return {
        ...state,
        schedule: payload.schedule,
        totalCount: payload.totalCount
      }
    }
  },
  initialState
);
