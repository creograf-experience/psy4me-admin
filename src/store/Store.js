import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { auth, modalsController, psychs, clients, admin } from "../reducers";

const rootReducer = combineReducers({
  auth,
  modalsController,
  psychs,
  clients,
  admin
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
