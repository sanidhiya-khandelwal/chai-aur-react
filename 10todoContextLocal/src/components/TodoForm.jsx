import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {

    /**
     * Will add single todo from here
     */
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!todo) return;

        //  addTodo(todo) is incorrect here as we need in this way {id,todo,completed: false} since we have id already present so addTodo({todo,completed: false})
        // addTodo({ todo: todo, completed: false }) 
        // when key and value names are same u can write one time only by default "completed" field is set to "false"
        addTodo({ todo, completed: false })
        setTodo("") //to clear up the input field
    }
    return (
        <form
            className="flex"
            onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={e => setTodo(e.target.value)}
            />
            {/* 
            no need to call any functionality on button since button is of type submit
            and in form we've onSubmit={add}
             */}
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

