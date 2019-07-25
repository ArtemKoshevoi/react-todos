import * as actionFilterTypes from "../actions/actions";
import initialState from "../state/initialState";
import {CustomAction, FilterInitialState} from "../../../interfaces";

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