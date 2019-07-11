import React from 'react'
import {ListItem, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import { Clear } from '@material-ui/icons'
import Checkbox from "@material-ui/core/Checkbox";

const todosComplited = (props: any) => {
  return (
    <ListItem style={{textDecoration: props.checked ? 'line-through' : 'none'} }>
      <Checkbox onChange={props.todoCompleted} color='primary' checked={props.checked}/>{props.name}
      <ListItemSecondaryAction>
        <IconButton color='secondary' onClick={props.clicked}><Clear />qweqwe</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
};

export default todosComplited