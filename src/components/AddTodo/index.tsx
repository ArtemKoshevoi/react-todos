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
import {State} from "../../redux/store";
import _ from "lodash"

interface AddTodoProps {
  propsTodos: any;
  onChangeCheckedTodo(checkedArr: any, checkedStatus: boolean): void;
  onAddedTodo(name: string): void;
}

interface AddTodoState {
  value: string;
  checkedArr: {id: string, checked: boolean}[];
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
    this.setState({value: _.trimStart(event.target.value)})
  };

  enterInputHandler(event: any): void {
    if (event.keyCode === 13 && this.state.value) {
      this.props.onAddedTodo(this.state.value);
      this.setState({value: ''})
    }
  };

  // componentDidUpdate(prevProps: Readonly<AddTodoProps>, prevState: Readonly<AddTodoState>, snapshot?: any): void {
  //   // this.createCheckedArrHandler()
  // }
  //
  // createCheckedArrHandler(): void {
  //   const isEveryCheckedTrue = this.props.propsTodos && this.props.propsTodos.every((todo: Todo) => {
  //     return todo.checked === true
  //   });
  //
  //   _.forEach(this.props.propsTodos, (todo: Todo) => {
  //     if (todo.checked === false && !isEveryCheckedTrue) {
  //       this.setState(
  //         {
  //           checkedArr: [...this.state.checkedArr, todo.id],
  //           checkedStatus: false
  //         });
  //     } else if (isEveryCheckedTrue) {
  //       this.setState(
  //         {
  //           checkedArr: [...this.state.checkedArr, todo.id],
  //           checkedStatus: true
  //         });
  //     }
  //   });
  // }
  //   this.props.propsTodos.map((todo: Todo) => {
  //     if (todo.checked === false && !isEveryCheckedTrue) {
  //       this.setState(
  //         {checkedArr: [...this.state.checkedArr, todo.id],
  //                checkedStatus: false});
  //     } else if (isEveryCheckedTrue) {
  //       this.setState(
  //         {checkedArr: [...this.state.checkedArr, todo.id],
  //               checkedStatus: true});
  //     }
  //   });
  // }

  render() {
    // this.createCheckedArrHandler();
    let checkedArr: any = [];
    let checkedStatus: boolean = true;
    const isEveryCheckedTrue = this.props.propsTodos && this.props.propsTodos.every((todo: Todo) => {
      return todo.checked === true
    });

    this.props.propsTodos.map((todo: Todo) => {
      if (todo.checked === false && !isEveryCheckedTrue) {
        checkedArr = [...checkedArr, todo.id];
        checkedStatus = false;
      } else if (isEveryCheckedTrue) {
        checkedArr = [...checkedArr, todo.id];
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
    onAddedTodo: (name: string) => dispatch({type: actionTypes.PUT_TODO, payload: {name}}),

    onChangeCheckedTodo: (checkedArr: any, checkedStatus: boolean) =>
      dispatch({type: actionTypes.CHANGE_CHECKED_REQUEST_TODO, payload: {checkedArr, checkedStatus}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)