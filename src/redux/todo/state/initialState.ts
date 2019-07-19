import {Todo} from "../../../interfaces";

export interface TodoInitialState {
  entities: Todo[]
}

const initialState = {
  entities: []
};

export default initialState