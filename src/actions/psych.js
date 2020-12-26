import { createAction } from "redux-actions";

import {
  EDIT_PSYCH_SUCCESS,
  EDIT_PSYCH_FAILED,
  BAN_PSYCH_SUCCESS,
  BAN_PSYCH_FAILED,
  CONFIRM_DELETE_PSYCH,
  DELETE_PSYCH_SUCCESS,
  DELETE_PSYCH_FAILED
} from "../constants";
import { openModal, closeModal } from "./modalController";
import {
  editPsych as editPsychFromServer,
  banPsych as banPsychFromServer,
  deletePsych as deletePsychFromServer,
  getPsychSchedule as getPsychScheduleFromServer
} from "../networkers";

export const editPsychRequest = createAction("EDIT_PSYCH_REQUEST");
export const editPsychSuccess = createAction("EDIT_PSYCH_SUCCESS");
export const editPsychFailed = createAction("EDIT_PSYCH_FAILED");

export const editPsych = (token, psych) => async dispatch => {
  dispatch(editPsychRequest());
  try {
    const response = await editPsychFromServer(token, psych);

    if (response.status === 0) dispatch(openModal(EDIT_PSYCH_SUCCESS));

    dispatch(editPsychSuccess());
  } catch (e) {
    openModal(EDIT_PSYCH_FAILED);
    dispatch(editPsychFailed());
  }
};

export const banPsychRequest = createAction("BAN_PSYCH_REQUEST");
export const banPsychSuccess = createAction("BAN_PSYCH_SUCCESS");
export const banPsychFailed = createAction("BAN_PSYCH_FAILED");

export const banPsych = (token, psych) => async dispatch => {
  dispatch(banPsychRequest());
  try {
    const response = await banPsychFromServer(token, psych);

    if (response.status === 0) dispatch(openModal(BAN_PSYCH_SUCCESS));

    dispatch(banPsychSuccess());
  } catch (e) {
    dispatch(openModal(BAN_PSYCH_FAILED));
    dispatch(banPsychFailed());
  }
};

export const deletePsychRequest = createAction("DELETE_PSYCH_REQUEST");
export const deletePsychSuccess = createAction("DELETE_PSYCH_SUCCESS");
export const deletePsychFailed = createAction("DELETE_PSYCH_FAILED");

export const deletePsych = (token, psych) => async dispatch => {
  dispatch(closeModal(CONFIRM_DELETE_PSYCH));
  dispatch(deletePsychRequest());
  try {
    const response = await deletePsychFromServer(token, psych);

    if (response.status === 0) dispatch(openModal(DELETE_PSYCH_SUCCESS));

    dispatch(deletePsychSuccess());
  } catch (e) {
    dispatch(openModal(DELETE_PSYCH_FAILED));
    dispatch(deletePsychFailed());
  }
};

export const getPsychScheduleRequest = createAction("GET_PSYCH_SCHEDULE_REQUEST");
export const getPsychScheduleSuccess = createAction("GET_PSYCH_SCHEDULE_SUCCESS");
export const getPsychScheduleFailed = createAction("GET_PSYCH_SCHEDULE_FAILED");

export const getPsychSchedule = (token, params) => async dispatch => {
  dispatch(getPsychScheduleRequest());
  try {
    const response = await getPsychScheduleFromServer(token, params);

    dispatch(getPsychScheduleSuccess(response.data));
  } catch (e) {
    dispatch(getPsychScheduleFailed(e.message));
  }
};
