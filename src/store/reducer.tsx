import * as actionTypes from './actions'
import {Todo} from "../interfaces";
import {Action} from "redux";

export interface State {
  todos: Todo[]
}

export interface CustomAction extends Action {
  payload: Todo
}

const initialState = {
  todos: []
};

const reducer = (state: State = initialState, action: CustomAction) => {
  const {type, payload} = action;
  switch (type) {
    case actionTypes.ADD_TODO:
      const newTodo: Todo = {
        id: Math.random().toString(),
        name: payload.name,
      };
      return {
        ...state,
        todos: [
          ...state.todos,
          newTodo
        ]
      };
    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.id)
      };
  }
  return state
};

export default reducer