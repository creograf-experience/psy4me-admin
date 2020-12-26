import { handleActions } from "redux-actions";

import { openModal, closeModal, closeAllModals } from "../actions";
import {
  // auth
  AUTH_ERROR,
  CONFIRM_EXIT,
  // psychs
  EDIT_PSYCH_SUCCESS,
  EDIT_PSYCH_FAILED,
  BAN_PSYCH_SUCCESS,
  BAN_PSYCH_FAILED,
  CONFIRM_DELETE_PSYCH,
  DELETE_PSYCH_SUCCESS,
  DELETE_PSYCH_FAILED,
  // clients
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILED,
  BAN_CLIENT_SUCCESS,
  BAN_CLIENT_FAILED,
  CONFIRM_DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  CONFIRM_CONNECT_PSYCH_TO_CLIENT,
  SUCCESS_CONNECT_PSYCH_TO_CLIENT,
  CONFIRM_MAKE_APPOINTMENT,
  SUCCESS_MAKE_APPOINTMENT,
  CONFIRM_EDIT_APPOINTMENT,
  SUCCESS_EDIT_APPOINTMENT,
  CONFIRM_ADD_PAYMENT,
  SUCCESS_ADD_PAYMENT
} from "../constants";

const initialState = {
  // auth
  [AUTH_ERROR]: false,
  [CONFIRM_EXIT]: false,
  // psychs
  [EDIT_PSYCH_SUCCESS]: false,
  [EDIT_PSYCH_FAILED]: false,
  [BAN_PSYCH_SUCCESS]: false,
  [BAN_PSYCH_FAILED]: false,
  [CONFIRM_DELETE_PSYCH]: false,
  [DELETE_PSYCH_SUCCESS]: false,
  [DELETE_PSYCH_FAILED]: false,
  // clients
  [EDIT_CLIENT_SUCCESS]: false,
  [EDIT_CLIENT_FAILED]: false,
  [BAN_CLIENT_SUCCESS]: false,
  [BAN_CLIENT_FAILED]: false,
  [CONFIRM_DELETE_CLIENT]: false,
  [DELETE_CLIENT_SUCCESS]: false,
  [DELETE_CLIENT_FAILED]: false,
  [CONFIRM_CONNECT_PSYCH_TO_CLIENT]: false,
  [SUCCESS_CONNECT_PSYCH_TO_CLIENT]: false,
  // admin
  [CONFIRM_MAKE_APPOINTMENT]: false,
  [SUCCESS_MAKE_APPOINTMENT]: false,
  [CONFIRM_EDIT_APPOINTMENT]: false,
  [SUCCESS_EDIT_APPOINTMENT]: false,

  [CONFIRM_ADD_PAYMENT]: false,
  [SUCCESS_ADD_PAYMENT]: false,
  data: {}
};

export const modalsController = handleActions(
  {
    [openModal](state, { payload }) {
      if (payload.data) {
        const addData = {
          [payload.modal]: payload.data
        };

        return {
          ...state,
          [payload.modal]: true,
          data: { ...state.data, ...addData }
        };
      }
      return { ...state, [payload]: true };
    },
    [closeModal](state, { payload }) {
      if (payload.data) {
        const addData = {
          [payload.modal]: payload.data
        };

        return {
          ...state,
          [payload.modal]: false,
          data: { ...state.data, ...addData }
        };
      }
      return { ...state, [payload]: false };
    },
    [closeAllModals]() {
      return initialState;
    }
  },
  initialState
);
