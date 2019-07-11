import React from 'react';
import Todos from './Todos'
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link, Route} from "react-router-dom";
import TodosActive from "./TodosActive";


const footer = (props: any) => {

  const flexContainer: any = {
    display: 'flex',
    width: '100%',
    maxWidth: '230px',
    alignItems: 'center',
    margin: 'auto'
  };

  const linkStyle: any = {
    textDecoration: 'none',
    color: 'black'
  };

  return (
    <List component='nav' style={flexContainer}>
      <Link style={linkStyle} to='/'>
        <ListItem button>
          <ListItemText primary="All"/>
        </ListItem>
      </Link>
      <Link style={linkStyle}  to='/active'>
        <ListItem button>
          <ListItemText primary="Active"/>
        </ListItem>
      </Link>
      <Link style={linkStyle}  to='/completed'>
        <ListItem button>
          <ListItemText primary="Completed"/>
        </ListItem>
      </Link>
    </List>
  )
};

export default footer