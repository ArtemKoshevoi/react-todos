import * as actionFilterTypes from "../actions/actions";
import {Action} from "redux";
import initialState from "../state/initialState";

export interface FilterInitialState {
  filter: string
}

export interface CustomAction extends Action {
  payload: any
}

const filtersReducer = (state: FilterInitialState = initialState, action: CustomAction) => {
  const {type, payload} = action;
  switch (type) {
    case actionFilterTypes.TAB_SELECTED:
      return {
        ...state,
        filter: payload.tabName
      };
  }

  return state
};

export default filtersReducer