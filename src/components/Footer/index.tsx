import React from 'react';
import {CustomAction, State, Todo} from "../../interfaces";
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Action} from "redux";
import * as actionTypes from "../../redux/todo/actions/actions";
import * as actionFilterTypes from "../../redux/filters/actions/actions";
import {connect} from "react-redux";
import {btnStyle, flexContainer, itemsCounter, linkStyle} from "./style";
import _ from 'lodash'

interface FooterProps {
  propsTodos: Array<Todo>;
  onClearCheckedTodo(checkedArr: string[]): void;
  onTabSelected(tab: string): void;
}

interface FooterState {
  counter: number,
  checkedArr: string[],
}

class footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      counter: 0,
      checkedArr: [],
    }
  }

  componentDidUpdate(prevProps: Readonly<FooterProps>, prevState: Readonly<FooterState>): void {
    if (this.props.propsTodos === prevProps.propsTodos) {
      return;
    }
    let localCounter: number = 0;
    let localCheckedArr: string[] = [];
      _.forEach(this.props.propsTodos, (todo: Todo): void => {
        if (todo.checked) {
          localCheckedArr.push(todo.id);
        } else {
          localCounter += 1
        }
      });
    this.setState({counter: localCounter});
    this.setState({checkedArr: [...localCheckedArr] });
  }

  render(): React.ReactNode {
    return (
      <Container>
        <List component='nav' style={flexContainer}>
          <Box component='span' style={itemsCounter}>
            {this.state.counter} {this.state.counter === 1 ? 'item' : 'items'} left
          </Box>
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
          <ListItem button={true}
                    disabled={this.state.checkedArr.length < 1}
                    style={btnStyle} onClick={() => this.props.onClearCheckedTodo(this.state.checkedArr)}>
            Clear completed
          </ListItem>
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos.entities
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onClearCheckedTodo: (checkedArr: string[]) =>
      dispatch({type: actionTypes.DELETE_CHECKED_REQUEST_TODO, payload: {checkedArr}}),

    onTabSelected: (tabName: string) =>
      dispatch({type: actionFilterTypes.TAB_SELECTED, payload: {tabName}})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(footer);