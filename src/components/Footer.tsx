import React from 'react';
import {Todo} from "../interfaces";
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {CustomAction, State} from "../store/reducer";
import {Action} from "redux";
import * as actionTypes from "../store/actions";
import {connect} from "react-redux";

interface FooterProps {
  propsTodos: Array<Todo>;
  onClearCheckedTodo(param: any): void;
}

class footer extends React.Component<FooterProps> {
  render(): React.ReactNode {
    const flexContainer: object = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      margin: 'auto',
      padding: '0',
      fontSize: '14px',
    };

    const linkStyle: object = {
      textDecoration: 'none',
      fontSize: '14px',
      color: 'black',
    };

    const btnStyle: object = {
      textAlign: 'center'
    };

    const itemsCounter: object = {
      width: '100%',
      maxWidth: '70px',
      marginRight: '25px',
    };

    let counter: number = 0;
    this.props.propsTodos.map((todo: Todo) => {
      if (todo.checked === false) {
        counter += 1;
      }
    });

    let counterText: string = counter === 1 ? 'item' : 'items';

    let checkedArr: any = [];

    this.props.propsTodos.map((todo: Todo) => {
      if (todo.checked === true) {
        checkedArr.push(todo.id);
      }
    });

    return (
      <Container>
        <List component='nav' style={flexContainer}>
          <Box component='span' style={itemsCounter}>{counter} {counterText} left</Box>
          <Link style={linkStyle} to='/'>
            <ListItem button>
              <ListItemText primary='All'/>
            </ListItem>
          </Link>
          <Link style={linkStyle} to='/active'>
            <ListItem button>
              <ListItemText primary='Active'/>
            </ListItem>
          </Link>
          <Link style={linkStyle} to='/completed'>
            <ListItem button>
              <ListItemText primary='Completed'/>
            </ListItem>
          </Link>
          <ListItem button={true} style={btnStyle} onClick={() => this.props.onClearCheckedTodo(checkedArr)}>
            Clear completed
          </ListItem>
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onClearCheckedTodo: (checkedArr: any) =>
      dispatch({type: actionTypes.DELETE_CHECKED_REQUEST_TODO, payload: {checkedArr}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(footer);