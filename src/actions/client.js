import { createAction } from "redux-actions";

import {
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILED,
  BAN_CLIENT_SUCCESS,
  BAN_CLIENT_FAILED,
  CONFIRM_DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  CONFIRM_CONNECT_PSYCH_TO_CLIENT,
  SUCCESS_CONNECT_PSYCH_TO_CLIENT
} from "../constants";
import { openModal, closeModal } from "./modalController";
import {
  editClient as editClientFromServer,
  banClient as banClientFromServer,
  deleteClient as deleteClientFromServer,
  connectPsychToClient as connectPsychToClientFromServer,
  getClientSchedule as getClientScheduleFromServer
} from "../networkers";

export const editClientRequest = createAction("EDIT_CLIENT_REQUEST");
export const editClientSuccess = createAction("EDIT_CLIENT_SUCCESS");
export const editClientFailed = createAction("EDIT_CLIENT_FAILED");

export const editClient = (token, client) => async dispatch => {
  dispatch(editClientRequest());
  try {
    const response = await editClientFromServer(token, client);

    if (response.status === 0) dispatch(openModal(EDIT_CLIENT_SUCCESS));

    dispatch(editClientSuccess());
  } catch (e) {
    dispatch(openModal(EDIT_CLIENT_FAILED));
    dispatch(editClientFailed());
  }
};

export const banClientRequest = createAction("BAN_CLIENT_REQUEST");
export const banClientSuccess = createAction("BAN_CLIENT_SUCCESS");
export const banClientFailed = createAction("BAN_CLIENT_FAILED");

export const banClient = (token, client) => async dispatch => {
  dispatch(banClientRequest());
  try {
    const response = await banClientFromServer(token, client);

    if (response.status === 0) dispatch(openModal(BAN_CLIENT_SUCCESS));

    dispatch(banClientSuccess());
  } catch (e) {
    dispatch(openModal(BAN_CLIENT_FAILED));
    dispatch(banClientFailed());
  }
};

export const deleteClientRequest = createAction("DELETE_PSYCH_REQUEST");
export const deleteClientSuccess = createAction("DELETE_PSYCH_SUCCESS");
export const deleteClientFailed = createAction("DELETE_PSYCH_FAILED");

export const deleteClient = (token, psych) => async dispatch => {
  dispatch(closeModal(CONFIRM_DELETE_CLIENT));
  dispatch(deleteClientRequest());
  try {
    const response = await deleteClientFromServer(token, psych);

    if (response.status === 0) dispatch(openModal(DELETE_CLIENT_SUCCESS));

    dispatch(deleteClientSuccess());
  } catch (e) {
    dispatch(openModal(DELETE_CLIENT_FAILED));
    dispatch(deleteClientFailed());
  }
};

export const connectPsychToClientRequest = createAction("DELETE_PSYCH_REQUEST");
export const connectPsychToClientSuccess = createAction("DELETE_PSYCH_SUCCESS");
export const connectPsychToClientFailed = createAction("DELETE_PSYCH_FAILED");

export const connectPsychToClient = (token, couple) => async dispatch => {
  dispatch(closeModal(CONFIRM_CONNECT_PSYCH_TO_CLIENT));
  dispatch(connectPsychToClientRequest());
  try {
    const response = await connectPsychToClientFromServer(token, couple);

    if (response.status === 0)
      dispatch(openModal(SUCCESS_CONNECT_PSYCH_TO_CLIENT));

    dispatch(connectPsychToClientSuccess());
  } catch (e) {
    dispatch(connectPsychToClientFailed());
  }
};

export const getClientScheduleRequest = createAction("GET_CLIENT_SCHEDULE_REQUEST");
export const getClientScheduleSuccess = createAction("GET_CLIENT_SCHEDULE_SUCCESS");
export const getClientScheduleFailed = createAction("GET_CLIENT_SCHEDULE_FAILED");

export const getClientSchedule = (token, params) => async dispatch => {
  dispatch(getClientScheduleRequest());
  try {
    const response = await getClientScheduleFromServer(token, params);

    dispatch(getClientScheduleSuccess(response.data));
  } catch (e) {
    dispatch(getClientScheduleFailed(e.message));
  }
};
