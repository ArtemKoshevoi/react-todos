import React from 'react';
import {Todo} from "../../interfaces";
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {CustomAction} from "../../redux/todo/reducers/reducer";
import {Action} from "redux";
import * as actionTypes from "../../redux/todo/actions/actions";
import * as actionFilterTypes from "../../redux/filters/actions/actions";
import {connect} from "react-redux";
import {btnStyle, flexContainer, itemsCounter, linkStyle} from "./style";
import {TodoInitialState} from "../../redux/todo/state/initialState";

interface FooterProps {
  propsTodos: Array<Todo>;
  onClearCheckedTodo(param: any): void;
  onTabSelected(tab: string): void;
}

class footer extends React.Component<FooterProps> {
  render(): React.ReactNode {
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
            <ListItem button onClick={() => this.props.onTabSelected('all')}>
              <ListItemText primary='All'/>
            </ListItem>
          </Link>
          <Link style={linkStyle} to='/active'>
            <ListItem button onClick={() => this.props.onTabSelected('active')}>
              <ListItemText primary='Active'/>
            </ListItem>
          </Link>
          <Link style={linkStyle} to='/completed'>
            <ListItem button onClick={() => this.props.onTabSelected('completed')}>
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

const mapStateToProps = (state: TodoInitialState) => {
  return {
    propsTodos: state.entities
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onClearCheckedTodo: (checkedArr: any) =>
      dispatch({type: actionTypes.DELETE_CHECKED_REQUEST_TODO, payload: {checkedArr}}),

    onTabSelected: (tabName: string) =>
      dispatch({type: actionFilterTypes.TAB_SELECTED, payload: {tabName}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(footer);