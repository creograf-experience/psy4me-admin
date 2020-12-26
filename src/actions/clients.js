import { createAction } from "redux-actions";
import { getClients as getClientsFromServer } from "../networkers";

export const getClientsRequest = createAction("GET_CLIENTS_REQUEST");
export const getClientsSuccess = createAction("GET_CLIENTS_SUCCESS");
export const getClientsFailed = createAction("GET_CLIENTS_FAILED");

export const getClients = token => async dispatch => {
  dispatch(getClientsRequest());
  try {
    const response = await getClientsFromServer(token);
    dispatch(getClientsSuccess(response.clientList));
  } catch (e) {
    dispatch(getClientsFailed(e.message));
  }
};
