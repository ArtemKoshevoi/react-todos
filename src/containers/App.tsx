import React from 'react';
import AddTodo from '../components/AddTodo'
import Todos from '../components/Todos'
import { connect } from "react-redux";
import * as actionTypes from '../store/actions'
import {Todo} from "../interfaces";
import {CustomAction, State} from "../store/reducer";

interface AppProps {
  propsTodos: Array<Todo>;
  onAddedTodo(param: string): void;
  onRemovedTodo(param: string): void;
}

interface AppState {
  todos: Array<Todo>
}

class App extends React.Component<AppProps, AppState>{
  render(): React.ReactNode {
    return (
      <div>
        <AddTodo todoAdd={this.props.onAddedTodo}/>
        {this.props.propsTodos.map((todo: Todo) => (
          <Todos
            key={todo.id}
            name={todo.name}
            clicked={() => this.props.onRemovedTodo(todo.id as string)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction) => void) => {
  return {
    onAddedTodo: (name: string) => dispatch({type: actionTypes.ADD_TODO, payload: {name}}),
    onRemovedTodo: (id: string) => dispatch({type: actionTypes.REMOVE_TODO, payload: {id}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);










/*class App extends React.Component<MyProps, MyState>{
  constructor(props: MyProps) {
    super(props);
    this.state = {
        tasks: this.props.tasks
    }
  }


  render(): React.ReactNode {
    const task = this.state.tasks.map((item, index) => {
      return <li key={index}>{item.name}</li>
    });

    return (
      <ul>
        {task}
      </ul>
    );
  }
}

const mapStateToProps = (state: MyState) => {
  return {
    tasks: state.tasks
  }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         action: () => dispatch({type: 'RELOAD'})
//     };
// };

export default connect(mapStateToProps)(App);*/

