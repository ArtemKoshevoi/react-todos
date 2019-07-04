import React from 'react'
import {Todo} from "../interfaces";

interface AddTodoProps {
  todoAdd: (task: string) => void
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

  todoChangedHandler(event: any) {
    this.setState({value: event.target.value})
  };

  render() {
    return (
      <div>
        <input type='text'
               value={this.state.value}
               onChange={(event) => this.todoChangedHandler(event)}
        />
        <button onClick={() => this.props.todoAdd(this.state.value)}>Add</button>
      </div>
    )
  }
}

export default AddTodo