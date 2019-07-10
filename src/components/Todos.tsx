import React from 'react'

const todos = (props: any) => {
  return (
    <li style={{textDecoration: props.checked ? 'line-through' : 'none'} }
        onClick={props.todoCompleted}>{props.name}
        <button onClick={props.clicked}>Remove</button>
    </li>
  )
};

export default todos