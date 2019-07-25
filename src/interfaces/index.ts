import {TodoInitialState} from "../redux/todo/state/initialState";
import {Action} from "redux";

export interface Todo {
  id?: string,
  name?: string,
  checked?: boolean,
}

export interface FilterInitialState {
  filter: string
}

export interface State {
  todos: TodoInitialState,
  filter: FilterInitialState,
}

export interface CustomAction extends Action {
  payload: any
}