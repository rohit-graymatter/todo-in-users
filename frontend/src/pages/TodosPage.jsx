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

    // SSE listener for real-time updates
    const eventSource = new EventSource("http://localhost:5000/api/notifications");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Only refresh todos for this user
      if (data.message.includes(id)) {
        fetchTodos();
      } else {
        // optionally ignore or still fetch if you want all updates
        fetchTodos();
      }
    };

    eventSource.onerror = () => {
      console.error("EventSource failed. Closing connection.");
      eventSource.close();
    };

    return () => eventSource.close();
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
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Back to Users
      </Link>
      <h1 className="text-center mb-4">User Todos</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}
