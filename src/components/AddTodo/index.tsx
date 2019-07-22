import React from 'react'
import { Paper, TextField } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import {KeyboardArrowDown} from "@material-ui/icons";
import {CustomAction} from "../../redux/todo/reducers/reducer";
import {connect} from "react-redux";
import {Action} from "redux";
import * as actionTypes from "../../redux/todo/actions/actions";
import {Todo} from "../../interfaces";
import {textFieldStyle} from "./style";
import {TodoInitialState} from "../../redux/todo/state/initialState";
import {State} from "../../redux/store";

interface AddTodoProps {
  propsTodos: any;
  todoAdd: (task: string, root?: any) => void;
  onChangeCheckedTodo(checkedArr: any, checkedStatus: boolean): void;
}

interface AddTodoState {
  value: string
}

class AddTodo extends React.Component<AddTodoProps, AddTodoState>{
  constructor(props:AddTodoProps) {
    super (props);
    this.state = {
      value: ''
    }
  }

  todoChangedHandler(event: any): void {
    this.setState({value: event.target.value})
  };

  enterInputHandler(event: any): void {
    if (event.keyCode === 13) {
      this.props.todoAdd(this.state.value);
      this.setState({value: ''})
    }
  };

  render() {
    let checkedArr: any = [];
    let checkedStatus: boolean = true;
    const isEveryCheckedTrue = this.props.propsTodos && this.props.propsTodos.every((todo: Todo) => {
      return todo.checked === true
    });

    this.props.propsTodos.map((todo: Todo) => {
      if (todo.checked === false && !isEveryCheckedTrue) {
        checkedArr.push(todo.id);
        checkedStatus = false;
      } else if (isEveryCheckedTrue) {
        checkedArr.push(todo.id);
        checkedStatus = true;
      }
    });

    return (
      <Paper style={textFieldStyle}>
        <IconButton onClick={() => this.props.onChangeCheckedTodo(checkedArr, checkedStatus)}>
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
    onChangeCheckedTodo: (checkedArr: any, checkedStatus: boolean) =>
      dispatch({type: actionTypes.CHANGE_CHECKED_REQUEST_TODO, payload: {checkedArr, checkedStatus}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)