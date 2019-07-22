import React from 'react'
import {connect} from "react-redux";
import {Todo} from "../../interfaces";
import List from "@material-ui/core/List";
import TodoListItem from "../TodoListItem/";
import {State} from "../../redux/store";

interface TodosProps {
  propsTodos: Array<Todo>;
  propsFilter: any;
  todoAdd: (task: string, root?: any) => void;
  onUpdateTodo(id: string, value: any): void;
}

interface TodosState {
  value: any,
}

class Index extends React.Component <TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props);
    this.state= {
      value: '',
    };
    this.necessaryTodo = this.necessaryTodo.bind(this);

  }

  necessaryTodo = (allTodos: any, filter: any) => {
    if (filter === 'completed') {
      return allTodos.filter((todo: Todo) => {
         return todo.checked
      })
    } else if (filter === 'active') {
      return allTodos.filter((todo: Todo) => {
        return !todo.checked
      })
      } else
        return allTodos
    };


  render(): React.ReactNode {
    return (
      <List>
        {this.necessaryTodo(this.props.propsTodos, this.props.propsFilter.filter).map((todo:Todo) => {
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
    propsTodos: state.todos.entities,
    propsFilter: state.filter
  }
};



export default connect(mapStateToProps)(Index)
