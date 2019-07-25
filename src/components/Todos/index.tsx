import React from 'react'
import {connect} from "react-redux";
import {FilterInitialState, State, Todo} from "../../interfaces";
import List from "@material-ui/core/List";
import TodoListItem from "../TodoListItem/";

interface TodosProps {
  propsTodos: Array<Todo>;
  propsFilter: FilterInitialState;
}

const Index = (props: TodosProps) => {
  const necessaryTodo = (allTodos: Array<Todo>, filter: string) => {
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

    return (
      <List>
        {necessaryTodo(props.propsTodos, props.propsFilter.filter).map((todo:Todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </List>
    );
  };

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos.entities,
    propsFilter: state.filter
  }
};

export default connect(mapStateToProps)(Index)
