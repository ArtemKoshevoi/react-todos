import * as actionTypes from './actions'
import {Todo} from "../interfaces";
import {Action} from "redux";
import {DELETE_CHECKED_TODO} from "./actions";

export interface State {
  todos: Todo[]
}

export interface CustomAction extends Action {
  payload: any
}

const initialState = {
  todos: []
};

const reducer = (state: State = initialState, action: CustomAction) => {
  const {type, payload} = action;
  switch (type) {
    case actionTypes.ADD_TODO:

      return {
        ...state,
        todos: [
          ...state.todos,
          payload
        ]
      };

    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: [
          ...payload
        ]
      };

    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload)
      };

    case actionTypes.DELETE_CHECKED_TODO:
      console.log(payload);
      return {
        ...state,
        todos: state.todos.filter(todo => !(payload.checkedArr as string[]).includes(todo.id as string))
      };

    case actionTypes.GET_TODOS_ERROR:
      alert(payload);
      break
  }

  return state
};

export default reducer