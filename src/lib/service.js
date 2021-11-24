import Axios from "axios";
export const saveTodo =(todo) => Axios.post('http://localhost:3030/api/todos', todo);
export const loadTodos = () => Axios.get('http://localhost:3030/api/todos');
export const destroyTodo = (id)=> Axios.delete(`http://localhost:3030/api/todos/${id}`);
export const updateTodo = (todo) => Axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo);