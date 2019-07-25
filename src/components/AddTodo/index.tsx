import React from 'react'
import { Paper, TextField } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import {KeyboardArrowDown} from "@material-ui/icons";
import {connect} from "react-redux";
import {Action} from "redux";
import * as actionTypes from "../../redux/todo/actions/actions";
import {textFieldStyle} from "./style";
import {CustomAction, State, Todo} from "../../interfaces";
import _ from 'lodash'

interface AddTodoProps {
  propsTodos: Array<Todo>;
  onChangeCheckedTodo(checkedArr: string[], checkedStatus: boolean): void;
  onAddedTodo(name: string): void;
}

interface AddTodoState {
  value: string;
  checkedArr: string[];
  checkedStatus: boolean;
}

class AddTodo extends React.Component<AddTodoProps, AddTodoState>{
  constructor(props:AddTodoProps) {
    super (props);
    this.state = {
      value: '',
      checkedArr: [],
      checkedStatus: true
    }
  }

  todoChangedHandler(event: any): void {
    this.setState({value: event.target.value})
  };

  enterInputHandler(event: any): void {
    const val = this.state.value.trim();
    if (event.keyCode === 13 && val) {
      this.props.onAddedTodo(val);
      this.setState({value: ''})
    }
  };

  componentDidUpdate(prevProps: Readonly<AddTodoProps>, prevState: Readonly<AddTodoState>): void {
    if (this.props.propsTodos === prevProps.propsTodos) {
      return
    }
    const isEveryCheckedTrue = this.props.propsTodos && this.props.propsTodos.every((todo: Todo) => {
          return todo.checked
        });

    let localCheckedArr: string[] = [];
    let localCheckedStatus: boolean = true;
    _.forEach(this.props.propsTodos, (todo: Todo) => {
      if (todo.checked === false && !isEveryCheckedTrue) {
        localCheckedArr = [...localCheckedArr, todo.id];
        localCheckedStatus = false;
      } else if (isEveryCheckedTrue) {
        localCheckedArr = [...localCheckedArr, todo.id];
        localCheckedStatus = true;
      }
    });
    this.setState({checkedArr: [...localCheckedArr]});
    this.setState({checkedStatus: localCheckedStatus});
  }

  render() {
    return (
      <Paper style={textFieldStyle}>
        <IconButton onClick={() => this.props.onChangeCheckedTodo(this.state.checkedArr, this.state.checkedStatus)}>
          <KeyboardArrowDown />
        </IconButton>
        <TextField value={this.state.value}
                   onChange={(event) => this.todoChangedHandler(event)}
                   onKeyDown={event => this.enterInputHandler(event)}
                   placeholder='What needs to be done?'
                   fullWidth={true}
        />
      </Paper>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos.entities
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onAddedTodo: (name: string) => dispatch({type: actionTypes.PUT_TODO, payload: {name}}),

    onChangeCheckedTodo: (checkedArr: string[], checkedStatus: boolean) =>
      dispatch({type: actionTypes.CHANGE_CHECKED_REQUEST_TODO, payload: {checkedArr, checkedStatus}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)