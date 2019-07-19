import React from 'react'
import {connect} from "react-redux";
import {Todo} from "../../interfaces";
import List from "@material-ui/core/List";
import TodoListItem from "../TodoListItem/";
import {TodoInitialState} from "../../redux/todo/state/initialState";

interface TodosProps {
  propsTodos: Array<Todo>;
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

const mapStateToProps = (state: TodoInitialState) => {
  return {
    propsTodos: state.entities
  }
};



export default connect(mapStateToProps)(Index)
