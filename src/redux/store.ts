import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {
  addTodoEpic,
  changeCheckedTodoEpic,
  checkedTodoEpic,
  deleteCheckedTodoEpic,
  deleteTodoEpic,
  getTodoEpic, updateTodoEpic
} from "./todo/epics/epics";
import filtersReducer, {FilterInitialState} from "./filters/reducers/reducer";
import todoReducer from "./todo/reducers/reducer";
import {TodoInitialState} from "./todo/state/initialState";
import {composeWithDevTools} from "redux-devtools-extension";

const rootEpic = combineEpics(
  getTodoEpic,
  addTodoEpic,
  deleteTodoEpic,
  checkedTodoEpic,
  deleteCheckedTodoEpic,
  changeCheckedTodoEpic,
  updateTodoEpic,
);

export interface State {
  todos: TodoInitialState,
  filter: FilterInitialState,
}

const rootReducer = combineReducers({
    filters: filtersReducer,
    todos: todoReducer
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store