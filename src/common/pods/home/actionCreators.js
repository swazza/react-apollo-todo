import { makeActionCreator } from "../utils";
import * as actions from "./actions";

export const updateNewTodo = makeActionCreator({
  type: actions.UPDATE_NEW_TODO,
  payloadProps: ["todo"]
});

export const resetNewTodo = makeActionCreator({
  type: actions.RESET_NEW_TODO
});
