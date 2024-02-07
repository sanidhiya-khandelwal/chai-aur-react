import { configureStore } from '@reduxjs/toolkit';
/**
 * CLARIFICATION FOR from where this name "todoReducer" is coming
 *  
 * In this file(todoSlice.js), the createSlice function creates a slice, 
 * and the reducers (addTodo and removeTodo) are part of this slice. 
 * The todoSlice.reducer is the reducer function that you export as the default export.
 *
 * So, when you import it using import todoReducer from '../features/todo/todoSlice', 
 * todoReducer is referring to the default export of todoSlice.js, which is the reducer function. 
 * It's a common convention to refer to the default reducer as somethingReducer when imported in this manner,
 * even though the actual name of the reducer in your code is todoSlice.reducer. 
 * I appreciate your patience and hope this clarifies the usage of todoReducer in your code.
 
 */
import todoReducer from '../features/todo/todoSlice'

/**
 * store is a varibale with the help of which we are exporting configureStore() which takes an object mostly
 *
 * The "reducer" property of configureStore is set to "todoReducer", 
 * indicating that this reducer will handle the state changes for the store.
 
*/

export const store = configureStore({
    reducer: todoReducer
})