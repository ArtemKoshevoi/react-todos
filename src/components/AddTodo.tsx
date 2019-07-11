import React from 'react'
import { Paper, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// import {BrowserRouter} from 'react-router-dom'

interface AddTodoProps {
  todoAdd: (task: string, root?: any) => void;
  root?: any
}

interface AddTodoState {
  value: string
}

const styles = {
  root: {
    maxWidth: '250px',
    padding: '20px',

  }
};

export default withStyles(styles) (class AddTodo extends React.Component<AddTodoProps, AddTodoState>{
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
    const classes = this.props;
    return (
      <Paper className={classes.root}>
        <TextField value={this.state.value}
                   onChange={(event) => this.todoChangedHandler(event)}
                   onKeyDown={event => this.enterInputHandler(event)}
                   placeholder='What needs to be done?'
                   fullWidth={true}
        />
      </Paper>
    )
  }
})

