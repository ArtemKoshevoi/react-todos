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
import {Action} from "redux";
import * as actionTypes from "../../redux/todo/actions/actions";
import {connect} from "react-redux";
import {textFieldStyle} from "../AddTodo/style";
import {CustomAction, FilterInitialState, State} from "../../interfaces";

interface TodoListItemProps {
  propsFilter: FilterInitialState;
  todo: any;
  onRemovedTodo(id: string): void;
  onCheckedTodo(id: string, checked: boolean): void;
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
    const {id, name, checked} = this.props.todo;
    return (
      <ListItem
        onDoubleClick={this.changeEditMode}
        style={{textDecoration: checked ? 'line-through' : 'none'} }>
        <ListItemIcon>
          <Checkbox onChange={() => this.props.onCheckedTodo(id, checked)}
                    color='primary'
                    checked={checked}/>
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
            {name}
          </Box>}
        />
        <ListItemSecondaryAction>
          <IconButton color='secondary' onClick={() => this.props.onRemovedTodo(id)}>
            <Clear />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsFilter: state.filter
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onRemovedTodo: (id: string) =>
      dispatch({type: actionTypes.DELETE_REQUEST_TODO, payload: {id}}),

    onCheckedTodo: (id: string, checked: boolean) =>
      dispatch({type: actionTypes.CHECKED_REQUEST_TODO, payload: {id, checked}}),

    onUpdateTodo: (id: string, value: string) =>
      dispatch({type: actionTypes.UPDATE_REQUEST_TODO, payload: {id, value}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)