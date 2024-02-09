/**
 * AddTodo = adding something to store with the help of "dispatch" 
 * so we need to "dispatch" using "event"
 */

import React, { useState } from 'react'
import { useDispatch } from 'react-redux' //step 2
import { addTodo } from '../features/todo/todoSlice' //step 4  that's why we imported them individually App.jsx

function AddTodo() {
    const [input, setInput] = useState(''); //step 1 creating states for holding input given by user
    const dispatch = useDispatch(); //step 3

    //step 4
    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input)) //step 5.. dispatch.. reducer(here it is "addTodo" whihc expect "action" i.e "input" given here) ko use krte hue store me value chnage/add krta h
        setInput('') //step 7 cleaning up the input field once user has added the todo
    }
    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
            <input
                type="text"
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={input}
                onChange={(e) => setInput(e.target.value)} // step 6
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Add Todo
            </button>
        </form>
    )
}

export default AddTodo