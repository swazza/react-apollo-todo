import { _homeStore } from "./store";
import { _homeReducers } from "./reducers";
import * as actions from "./actionCreators";

export const homeStore = _homeStore;
export const homeReducers = _homeReducers;
export const homeActions = { ...actions };
