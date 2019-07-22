import {ofType} from "redux-observable";
import {
  ADD_TODO,
  CHANGE_CHECKED_REQUEST_TODO,
  CHANGE_CHECKED_TODO,
  CHECKED_REQUEST_TODO,
  CHECKED_TODO,
  DELETE_CHECKED_REQUEST_TODO, DELETE_CHECKED_TODO,
  DELETE_REQUEST_TODO,
  DELETE_TODO,
  GET_TODOS,
  GET_TODOS_ERROR,
  PUT_TODO,
  SET_TODOS, UPDATE_REQUEST_TODO, UPDATE_TODO
} from "../actions/actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {CustomAction} from "../reducers/reducer";

export const getTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(GET_TODOS),
    mergeMap(async () => {
      const url = `http://localhost:3001/todos`;
      const payload = await fetch(url).then(res => res.json());
      console.log(payload);
      return { type: SET_TODOS, payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

export const addTodoEpic = (action$: any) =>
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
      return { type: ADD_TODO, payload: response };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

export const deleteTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(DELETE_REQUEST_TODO),
    mergeMap(async (action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      await fetch(url + action.payload.id, {method: 'DELETE'}).then(res => res.json());
      return { type: DELETE_TODO, payload: action.payload.id };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

export const checkedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(CHECKED_REQUEST_TODO),
    mergeMap(async (action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      const data = {
        "checked": !action.payload.checked
      };
      await fetch(
        url + action.payload.id,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }
      )
        .then(res => res.json());
      return { type: CHECKED_TODO, payload: action.payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

export const changeCheckedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(CHANGE_CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      const data = {
        "checked": !action.payload.checkedStatus
      };
      return from(action.payload.checkedArr).pipe(
        mergeMap(async (id: any) => {
          await fetch(
            url + id,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            }
          )
            .then(res => res.json());
          return action.payload;
        }),
      );
    }),
    map((payload) => {
      return { type: CHANGE_CHECKED_TODO, payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );


export const deleteCheckedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(DELETE_CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      return from(action.payload.checkedArr).pipe(
        mergeMap(async (id: any) => {
          await fetch(url + id, {method: 'DELETE'});
          return action.payload;
        }),
      );
    }),
    map((payload) => {
      return { type: DELETE_CHECKED_TODO, payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );

export const updateTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(UPDATE_REQUEST_TODO),
    mergeMap(async (action: CustomAction) => {
      const url = `http://localhost:3001/todos/`;
      const data = {
        "name": action.payload.value
      };
      await fetch(
        url + action.payload.id,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }
      )
        .then(res => res.json());
      return { type: UPDATE_TODO, payload: action.payload };
    }),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
  );