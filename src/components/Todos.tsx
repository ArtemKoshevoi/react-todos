import React from 'react'
import {State} from "../store/reducer";
import {connect} from "react-redux";
import {Todo} from "../interfaces";
import List from "@material-ui/core/List";
import TodoListItem from "./TodoListItem";

interface TodosProps {
  propsTodos: Array<Todo>;
  todoAdd: (task: string, root?: any) => void;
  onUpdateTodo(id: string, value: any): void;
}

interface TodosState {
  value: any,
}

class Todos extends React.Component <TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props);
    this.state= {
      value: '',
    }
  }

  render(): React.ReactNode {
    return (
      <List>
        {this.props.propsTodos.map((todo:Todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos
  }
};


export default connect(mapStateToProps)(Todos)
