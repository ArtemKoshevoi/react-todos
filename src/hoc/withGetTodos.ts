import React from 'react'
import {CustomAction} from "../interfaces";
import {Action} from "redux";
import * as actionTypes from "../redux/todo/actions/actions";
import {connect} from "react-redux";

interface WithGetTodosProps {
  onGetTodos(): void;
}




const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onGetTodos: () => dispatch({type: actionTypes.GET_TODOS}),
  }
};

export default connect(null, mapDispatchToProps)(WithGetTodos);