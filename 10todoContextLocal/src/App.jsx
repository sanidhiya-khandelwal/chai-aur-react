import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'

function App() {
  // todos means there are many todo
  const [todos, setTodos] = useState([]);

  /**
   * todo=>single todo
   * setTodos(todo)= if we do like this then if there are any previous todo present in todos array then they'll be removed
   * setTodos((prev) => [todo, ...prev]) => in this way(CallBack), (prev) is an array[{todo1},{todo2}] means all old todo presnt in todos array so prev is also an array, so in order to add inside an array we need to destructure the old values in array so we used spread operator 
   * Now we need todo like an object, since in TodoContext.js it consists of {id,todo,completed} so we destrucutred the todo from above and did it like this { id: Date.now(), ...todo } we will add "complete" fromwhere we call tis function
   */
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  /**
   * ()=>() means callback
   * updateTodo is taking one id and todo message, todo message is that needs to be updated. , returns an array
   * prev means array it will be like [{todo1,todo2}]
   * prevTodo is like {todo1}i.e each element, here it is each object
   * how to access key inside objct=>  Object.key
   * if id matches then add todo which is new/updated todo
   * if not then add prevTodo i.e the old one
   */
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  /**
   * deleteTodo is taking id based on which we are filtering items , returns an array
   * We are filtering out or removing the object(todo) based on todo id not matching the id that is passed.
   * filter condtion if true then that objects only will be shown 
   * prev is an array
   * on that we applied filter method 
   * todo is an object
   */
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  /**
   * it takes id
   * prev is array
   * prevTodo is Object
   * if id matches then destrucrure the old object so that we can override/add some values or value, here it is value and we are taing previous key i.e "completed" and changing it with the help of  (!) is often used as a logical NOT operator. It is used to negate a Boolean value
   * if id does not matche then put old object only i.e. prevTodo
  */
  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(prevTodo =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  /***
   * Local storage to get item and set item
   * 
   * when u get item from local storage u get it in the form of string and then u need to do JSON.parse() 
   * when u set item in local storage u need to convert it in string format JSON.string()
   *  
  */
  /**
   * getItems to get all the items when page loads and display on UI
   * getItems takes key so here key is "todos" we will set it as "todos" when we will set in local storage 
   */
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    //if todos exists and todos.length {todo is that present in above line} JSON can also be an array, originally what is present can also be restored from JSON 
    if (todos && todos.length) {
      setTodos(todos)
    }
  }, [])

  /**
   * setItems to set the items in local storage.
   * it takes key and value
   * key is "todos"
   * value is todos which we converting in JSON.stringify
   * we will need to convert in String format with help of JSON.stringify
   * Whenerve todos is changed this useEffect will run
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
