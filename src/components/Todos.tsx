import React from 'react'

const todos = (props: any) => {
  return (
    <li>{props.name}<button onClick={props.clicked}>Remove</button></li>
  )
};

export default todos