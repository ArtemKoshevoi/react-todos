import React, {ComponentClass, FunctionComponent} from 'react'
import {CustomAction} from "../interfaces";
import {Action} from "redux";
import * as actionTypes from "../redux/todo/actions/actions";
import {connect} from "react-redux";

interface WithGetTodosProps {
  onGetTodos(): void;
}

const withGetTodos = (WrappedComponent: ComponentClass<any> | FunctionComponent<any>): ComponentClass<any> => {
  class WithGetTodos extends React.Component<WithGetTodosProps>{

    componentDidMount(): void {
      this.props.onGetTodos();
    }

    render(): React.ReactNode {
     return  <WrappedComponent {...this.props}/>
   }
  }

  return connect(null, mapDispatchToProps)(WithGetTodos);

};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onGetTodos: () => dispatch({type: actionTypes.GET_TODOS}),
  }
};

export default withGetTodos