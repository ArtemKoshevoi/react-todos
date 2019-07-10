import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import {combineEpics, createEpicMiddleware, ofType} from "redux-observable";

import './index.css';
// import postRequest from './methods/post-request'
import App from './containers/App';
import reducer, {CustomAction} from './store/reducer'
import * as serviceWorker from './serviceWorker';
import {ADD_TODO, DELETE_TODO, GET_TODOS, GET_TODOS_ERROR, PUT_TODO, SET_TODOS} from "./store/actions";
import {catchError, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

const getTodoEpic = (action$: any) =>
  action$.pipe(
    // tap(res => console.log(111, res)),
    ofType(GET_TODOS),
    mergeMap(async () => {
      const url = `http://localhost:3001/todos`;
      const payload = await fetch(url).then(res => res.json());
      return { type: SET_TODOS, payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

const addTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(PUT_TODO),
    mergeMap(async (action: CustomAction) => {
      const url = `http://localhost:3001/todos`;
      const data = JSON.stringify({
        id: Math.random(),
        name: action.payload.name,
        checked: false
      });

      const response = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: data,
        },
      )
        .then(res => res.json());
      // const response = postRequest(url, data);
      return { type: ADD_TODO, payload: response };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

const deleteTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(DELETE_TODO),
    mergeMap(async (action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      await fetch(url + action.payload.id, {method: 'DELETE'}).then(res => res.json());
      const payload = await fetch(url).then(res => res.json());

      return { type: SET_TODOS, payload: payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );


const rootEpic = combineEpics(
  getTodoEpic,
  addTodoEpic,
  deleteTodoEpic
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();