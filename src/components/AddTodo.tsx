import React from 'react'

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

  todoChangedHandler(event: any): void {
    this.setState({value: event.target.value})
  };

  enterInputHandler(event: any): void {
    if (event.keyCode === 13) {
      this.props.todoAdd(this.state.value)
    }
  };

  render() {
    return (
      <div>
        <input type='text'
               value={this.state.value}
               onChange={(event) => this.todoChangedHandler(event)}
               onKeyDown={event => this.enterInputHandler(event)}
        />
      </div>
    )
  }
}

export default AddTodo