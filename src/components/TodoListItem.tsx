import React from 'react'
import {
  Checkbox,
  Box,
  Container,
  IconButton, ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from "@material-ui/core";
import {Clear} from "@material-ui/icons";
import {CustomAction, State} from "../store/reducer";
import {Action} from "redux";
import * as actionTypes from "../store/actions";
import {connect} from "react-redux";
import {Todo} from "../interfaces";

interface TodoListItemProps {
  propsTodos: Array<Todo>;
  todo: any;
  onRemovedTodo(id: string): void;
  onCheckedTodo(id: string, checked: any): void;
  onUpdateTodo(id: string, value: string): void;
}

interface TodoListItemState {
  isInEditMode: boolean,
  value: string
}

class TodoListItem extends React.Component<TodoListItemProps, TodoListItemState> {
  constructor(props: TodoListItemProps) {
    super(props);
    this.state = {
      isInEditMode: false,
      value: this.props.todo.name
    }
  }

  changeEditMode = () => {
    this.setState({
      isInEditMode: true,
    })
  };

  handleValueChange = (event: any) => {
    this.setState({
      value: event.target.value
    });
  };

  enterInputHandler(event: any): void {
    if (event.keyCode === 13) {
      this.setState({
        isInEditMode: !this.state.isInEditMode,
      });
      this.props.onUpdateTodo(this.props.todo.id, this.state.value)
    } else if (event.keyCode === 27){
      this.setState({
        value: this.props.todo.name,
        isInEditMode: false,
      })
    }
  };

  render(): React.ReactNode {
    const todo = this.props.todo;

    const textFieldStyle: object = {
      paddingLeft: 0
    };

    return (
      <ListItem
        onDoubleClick={this.changeEditMode}
        style={{textDecoration: todo.checked ? 'line-through' : 'none'} }>
        <ListItemIcon>
          <Checkbox onChange={() => this.props.onCheckedTodo((todo.id as string), todo.checked)}
                    color='primary'
                    checked={todo.checked}/>
        </ListItemIcon>
        <ListItemText primary={this.state.isInEditMode ?
          <Container

            style={textFieldStyle}>
            <TextField
              type='text'
              value={this.state.value}
              onChange={this.handleValueChange}
              onKeyDown={event => this.enterInputHandler(event)}
              autoFocus={true}
            />
          </Container> :
          <Box component='label'>
            {todo.name}
          </Box>}
        />
        <ListItemSecondaryAction>
          <IconButton color='secondary' onClick={() => this.props.onRemovedTodo(todo.id as string)}>
            <Clear />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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

    onCheckedTodo: (id: string, checked: any) =>
      dispatch({type: actionTypes.CHECKED_REQUEST_TODO, payload: {id, checked}}),

    onUpdateTodo: (id: string, value: string) =>
      dispatch({type: actionTypes.UPDATE_REQUEST_TODO, payload: {id, value}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)