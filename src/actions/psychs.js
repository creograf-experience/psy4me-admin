import { createAction } from "redux-actions";
import { getPsychs as getPsychsFromServer } from "../networkers";

export const getPsychsRequest = createAction("GET_PSYCHS_REQUEST");
export const getPsychsSuccess = createAction("GET_PSYCHS_SUCCESS");
export const getPsychsFailed = createAction("GET_PSYCHS_FAILED");

export const getPsychs = token => async dispatch => {
  dispatch(getPsychsRequest());
  try {
    const response = await getPsychsFromServer(token);

    dispatch(getPsychsSuccess(response.psychList));
  } catch (e) {
    dispatch(getPsychsFailed(e.message));
  }
};
