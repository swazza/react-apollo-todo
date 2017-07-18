import { createReducer } from "../utils";
import * as actions from "./actions";

export const _homeReducers = {
  newTodo: createReducer({
    initialState: "",
    handlers: {
      [actions.UPDATE_NEW_TODO]: (state, action) => action.payload.todo,
      [actions.RESET_NEW_TODO]: (state, action) => ""
    }
  })
};
