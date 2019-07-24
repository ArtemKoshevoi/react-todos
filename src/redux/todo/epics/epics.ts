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
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {from, of} from "rxjs";
import {CustomAction} from "../reducers/reducer";
import {ajax} from "rxjs/ajax";
import {ajaxDelete, ajaxPatch, ajaxPost} from "rxjs/internal-compatibility";

export const getTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(GET_TODOS),
    mergeMap(() => ajax.getJSON('http://localhost:3001/todos').pipe(
      map(response => ({ type: SET_TODOS, payload: response })),
      catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
    ))
  );

export const addTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(PUT_TODO),
    mergeMap((action: CustomAction) => ajaxPost(
      `http://localhost:3001/todos`,
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
      `http://localhost:3001/todos/` + action.payload.id
    ).pipe(
      map(() => ({ type: DELETE_TODO, payload: action.payload.id })),
      catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message }))
    )));

export const checkedTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(CHECKED_REQUEST_TODO),
    mergeMap((action: CustomAction) => ajaxPatch(
      `http://localhost:3001/todos/` + action.payload.id,
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
          mergeMap((id: any) => ajaxPatch(
            `http://localhost:3001/todos/` + id,
            JSON.stringify({
              "checked": !action.payload.checkedStatus
            }),
            {
              'Content-Type': 'application/json'
            })
          )
        )}
    ),
    map((payload) => ({ type: CHANGE_CHECKED_TODO, payload }))
    );



// export const changeCheckedTodoEpic = (action$: any) =>
//   action$.pipe(
//     ofType(CHANGE_CHECKED_REQUEST_TODO),
//     mergeMap((action: CustomAction) => {
//       const url = `http://localhost:3001/todos/`;
//       const data = {
//         "checked": !action.payload.checkedStatus
//       };
//       return from(action.payload.checkedArr).pipe(
//         mergeMap(async (id: any) => {
//           await fetch(
//             url + id,
//             {
//               method: 'PATCH',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(data),
//             }
//           )
//             .then(res => res.json());
//           return action.payload;
//         }),
//       );
//     }),
//     map((payload) => {
//       return { type: CHANGE_CHECKED_TODO, payload };
//     }),
//     catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
//   );

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

// export const deleteCheckedTodoEpic = (action$: any) =>
//   action$.pipe(
//     ofType(DELETE_CHECKED_REQUEST_TODO),
//     mergeMap((action: CustomAction) => {
//       const url = `http://localhost:3001/todos/`;
//       return from(action.payload.checkedArr).pipe(
//         mergeMap(async (id: any) => {
//           await fetch(url + id, {method: 'DELETE'});
//           return action.payload;
//         }),
//       );
//     }),
//     map((payload) => {
//       return { type: DELETE_CHECKED_TODO, payload };
//     }),
//     catchError(err => of({ type: GET_TODOS_ERROR, payload: err.message })),
//   );

export const updateTodoEpic = (action$: any) =>
  action$.pipe(
    ofType(UPDATE_REQUEST_TODO),
    mergeMap((action: CustomAction) => ajaxPatch(
      `http://localhost:3001/todos/` + action.payload.id,
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
