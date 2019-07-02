
interface Todo {
    id: string,
    name: string,
    checked: boolean
}

interface MyState {
    tasks: Array<Todo>
}


const initialState: MyState = {
    tasks: [
        {id: '111', name: '222', checked: false}
    ]
};

const reducer = (state = initialState, action) => {
    return state
};


export default reducer()