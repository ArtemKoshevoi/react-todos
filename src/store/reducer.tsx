import * as actionTypes from './actions'
import {Todo} from "../interfaces";
import {Action} from "redux";

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

    case actionTypes.CHANGE_CHECKED_TODO:
      console.log(payload);
      return {
        ...state,
       todos: [
         ...state.todos.map(todo => ({
           ...todo, checked: !payload.checkedStatus
         }))
       ]
      };

    case actionTypes.UPDATE_TODO:
      console.log(payload.id);
      return {
        ...state,
        todos: state.todos.reduce((acc: any, value) =>
            [...acc, value.id === payload.id ? {...value, name: payload.value} : value]
    , [])
      };

    case actionTypes.GET_TODOS_ERROR:
      alert(payload);
      break
  }

  return state
};

export default reducer