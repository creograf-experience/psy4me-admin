import { handleActions } from "redux-actions";

import { getPsychScheduleSuccess, getPsychsSuccess } from "../actions";

const initialState = {
  psychs: [],
  schedule: [],
  totalCount: 0,
};

export const psychs = handleActions(
  {
    [getPsychsSuccess](state, { payload }) {
      return { ...state, psychs: payload };
    },
    [getPsychScheduleSuccess](state, { payload }) {
      return {
        ...state,
        schedule: payload.schedule,
        totalCount: payload.totalCount
      }
    }
  },
  initialState
);
