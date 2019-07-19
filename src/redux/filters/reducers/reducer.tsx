import * as actionFilterTypes from "../actions/actions";
import {Action} from "redux";
import initialState from "../state/initialState";

export interface FilterInitialState {
  filters: string
}

export interface CustomAction extends Action {
  payload: any
}

const filtersReducer = (state: FilterInitialState = initialState, action: CustomAction) => {
  const {type, payload} = action;
  console.log(action);
  switch (type) {
    case actionFilterTypes.TAB_SELECTED:
      console.log(payload);
      return {
        ...state,
      };
  }

  return state
};

export default filtersReducer