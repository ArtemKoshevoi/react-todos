import {url} from "inspector";

interface Todo {
  id: string,
  name: string,
  checked: boolean
}

interface MyState {
  tasks: Array<Todo>
}


// let url: string = "http://localhost:3001/tasks";
// fetch(url)
//   .then(resp => resp.json())
//   .then(data => {
//     let tasks = data.map((task: MyState) => {
//       return (
//
//       )
//     })
//   });

const initialState: MyState = {
  tasks: [
    {id: '1', name: "222", checked: false},
    {id: '2', name: "333", checked: false}
  ]
};


const rootReducer = (state = initialState) => {
  return state
};


export default rootReducer