import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function TodosPage() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await api.get(`/todos/${id}`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, [id]);

  const addTodo = async (todo) => {
    await api.post("/todos", { ...todo, userId: id });
    fetchTodos();
  };

  const updateTodo = async (todoId, todo) => {
    await api.put(`/todos/${todoId}`, todo);
    fetchTodos();
  };

  const deleteTodo = async (todoId) => {
    await api.delete(`/todos/${todoId}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to Users</Link>
      <h1>User Todos</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}
