import React, { Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
// import Button from '@material-ui/core/Button';

interface Todo {
    id: string,
    name: string,
    checked: boolean
}

interface MyProps {
    tasks: Array<Todo>
}

interface MyState {
    tasks: Array<Todo>
}



class App extends React.Component<MyProps, MyState>{
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

export default connect(mapStateToProps)(App);

