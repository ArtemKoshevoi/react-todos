import React from 'react';
import AddTodo from '../../components/AddTodo'
import Todos from '../../components/Todos'
import Footer from '../../components/Footer'
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter, Route} from "react-router-dom";
import WithGetTodos from "../../hoc/withGetTodos";

class App extends React.Component{

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
export default WithGetTodos(App);


