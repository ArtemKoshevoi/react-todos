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
import {catchError, concatMap, map, mergeMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {ajaxDelete, ajaxPatch, ajaxPost} from "rxjs/internal-compatibility";
import {localUrl} from "../../../shared/consts";
import {CustomAction} from "../../../interfaces";

export const getTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(GET_TODOS),
    mergeMap(() => ajax.getJSON(localUrl).pipe(
      map(response => ({ type: SET_TODOS, payload: response })),
      catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
    ))
  );

export const addTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(PUT_TODO),
    mergeMap((action: CustomAction) => ajaxPost(
      localUrl,
        JSON.stringify({
        id: Math.random(),
        name: action.payload.name,
        checked: false
      }),
      {
        'Content-Type': 'application/json'
      }).pipe(
        map(res => ({ type: ADD_TODO, payload: res.response })),
        catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
      ))
  );

export const deleteTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(DELETE_REQUEST_TODO),
    mergeMap( (action: CustomAction) => ajaxDelete(
      localUrl + action.payload.id
    ).pipe(
      map(() => ({ type: DELETE_TODO, payload: action.payload.id })),
      catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
    )));

export const checkedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => ajaxPatch(
      localUrl + action.payload.id,
      JSON.stringify({
        "checked": !action.payload.checked
      }),
      {
        'Content-Type': 'application/json'
      }).pipe(
        map((res) => ({ type: CHECKED_TODO, payload: res.response })),
        catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
    )));

export const changeCheckedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(CHANGE_CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => {
        return from (action.payload.checkedArr).pipe(
          concatMap((id: any) => ajaxPatch(
            localUrl + id,
            JSON.stringify({
              "checked": !action.payload.checkedStatus
            }),
            {
              'Content-Type': 'application/json'
            })
          )
        )}
    ),
    map((payload) => ({ type: CHANGE_CHECKED_TODO, payload })),
    catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
    );

// export const deleteCheckedTodoEpic = (action$: any) =>
//   action$.pipe(
//     ofType(DELETE_CHECKED_REQUEST_TODO),
//     mergeMap((action: CustomAction) => {
//       return from(action.payload.checkedArr).pipe(
//         concatMap((id: any) => ajaxDelete(
//           localUrl + id,
//         ))
//       )
//     }),
//     map((res) => ({type: DELETE_CHECKED_TODO, payload: res})),
//     catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
//   );

export const deleteCheckedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(DELETE_CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => {
      return from(action.payload.checkedArr).pipe(
        concatMap(async (id: any) => {
          await fetch(localUrl + id, {method: 'DELETE'});
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
    mergeMap((action: CustomAction) => ajaxPatch(
      localUrl + action.payload.id,
      JSON.stringify({
        "name": action.payload.value,
      }),
      {
        'Content-Type': 'application/json'
      }).pipe(
        map((res) => ({ type: UPDATE_TODO, payload: res.response })),
        catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
      )
    ));
