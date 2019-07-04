import React from 'react'

const todos = (props: any) => {
  return (
    <p onClick={props.clicked}>{props.name}</p>
  )
};

export default todos