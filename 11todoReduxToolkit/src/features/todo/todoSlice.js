import { createSlice, nanoid } from "@reduxjs/toolkit";

/*initial state can be an object or an array*/
const initalState = {
    todos: [{ id: 1, text: "Hello World" }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        /*  * reducers has property:function
            * function ha state and action (state,action)=>{}
            * state has all the values that are currently present here, object of arrays 
            * action has values like id or text
        */
        addTodo: (state, action) => {
            const todo = { //todo is created
                id: nanoid(),
                text: action.payload
            }
            //push single todo in array(todos) which can be accessed thru "states"
            states.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})
/*
    * exporting all the functionlaities/reducrs individually so that it can be used be components
    * reason the reducers(addTodo,removeTodo) we need them individually for adding/removing thru reducers only we will update the state so will need them individually in our components 
*/
export const { addTodo, removeTodo } = todoSlice.actions;

/*
    * We will provide list of all reducers to store 
    * To make our store aware regarding all the reducers we have
    * If STORE is not aware then it will not be able to maintain the store
    * As this is also an restrictive store means it will not update value by taking something randomly
    * It will updat value for the reducers which are registered under it, it will take value from that reducers and update the state
 */
export default todoSlice.reducer;