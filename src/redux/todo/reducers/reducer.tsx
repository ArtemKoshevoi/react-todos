import * as actionTypes from '../actions/actions'
import {Action} from "redux";
import initialState, {TodoInitialState} from "../state/initialState";

export interface CustomAction extends Action {
  payload: any
}

const todoReducer = (state: TodoInitialState = initialState, action: CustomAction) => {
  const {type, payload} = action;
  switch (type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        entities: [
          ...state.entities,
          payload
        ]
      };

    case actionTypes.SET_TODOS:
      return {
        ...state,
        entities: [
          ...payload
        ]
      };

    case actionTypes.DELETE_TODO:
      return {
        ...state,
        entities: state.entities.filter(todo => todo.id !== payload)
      };

    case actionTypes.CHECKED_TODO:
      return {
        ...state,
        entities: state.entities.reduce((acc: any, value) =>
            [...acc, value.id === payload.id ? {...value, checked: !value.checked} : value]
          , [])
      };

    case actionTypes.DELETE_CHECKED_TODO:
      return {
        ...state,
        entities: state.entities.filter(todo => !(payload.checkedArr as string[]).includes(todo.id as string))
      };

    case actionTypes.CHANGE_CHECKED_TODO:
      return {
        ...state,
        entities: [
         ...state.entities.map(todo => ({
           ...todo, checked: payload.response.checked
         }))
       ]
      };

    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        entities: state.entities.reduce((acc: any, value) =>
            [...acc, value.id === payload.id ? {...value, name: payload.value} : value]
    , [])
      };

    case actionTypes.GET_TODOS_ERROR:
      alert(payload);
      break
  }

  return state
};

export default todoReducer