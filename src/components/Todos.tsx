import React from 'react'
import {ListItem, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import { Clear } from '@material-ui/icons'
import Checkbox from "@material-ui/core/Checkbox";
import {CustomAction, State} from "../store/reducer";
import {connect} from "react-redux";
import {Todo} from "../interfaces";
import List from "@material-ui/core/List";
import {Action} from "redux";
import * as actionTypes from "../store/actions";

interface TodosProps {
  propsTodos: Array<Todo>;
  onCheckedTodo(param: string, checked: any): void;
  onRemovedTodo(param: any): void;
}

class Todos extends React.Component <TodosProps> {
  render(): React.ReactNode {
    const list = this.props.propsTodos.map((todo:Todo) => {
      return (
        <ListItem key={todo.id} style={{textDecoration: todo.checked ? 'line-through' : 'none'} }>
          <Checkbox onChange={() => this.props.onCheckedTodo((todo.id as string), todo.checked)}
                    color='primary'
                    checked={todo.checked}/>{todo.name}
          <ListItemSecondaryAction>
            <IconButton color='secondary' onClick={() => this.props.onRemovedTodo(todo.id as string)}>
              <Clear />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <List>
        {list}
      </List>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onRemovedTodo: (id: string) =>
      dispatch({type: actionTypes.DELETE_REQUEST_TODO, payload: {id}}),

    onCheckedTodo: (id: string, checked: boolean) =>
      dispatch({type: actionTypes.CHECKED_TODO, payload: {id, checked}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos)