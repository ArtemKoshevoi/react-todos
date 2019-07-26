import React from 'react';
import AddTodo from '../../components/AddTodo'
import Todos from '../../components/Todos'
import Footer from '../../components/Footer'
import {connect} from "react-redux";
import * as actionTypes from '../../redux/todo/actions/actions'
import {Action} from "redux";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter, Route} from "react-router-dom";
import {CustomAction} from "../../interfaces";
import WithGetTodos from "../../hoc/withGetTodos";

interface AppProps {
  onGetTodos(): void;
}

class App extends React.Component<AppProps>{
  constructor(props: AppProps) {
    super(props);
    // props.onGetTodos();
  }

  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" color='error' gutterBottom={true} align='center'>todos</Typography>
          <div>
            <AddTodo />
            <Route path='/' exact component={Todos}/>
            <Route path='/active' component={Todos}/>
            <Route path='/completed' component={Todos}/>
          </div>
          <Footer />
        </Container>
      </BrowserRouter>
    );
  }
}

// const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
//   return {
//     onGetTodos: () => dispatch({type: actionTypes.GET_TODOS}),
//   }
// };

export default WithGetTodos(App);


