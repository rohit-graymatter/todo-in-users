import { useEffect, useState } from "react";
import api from "../api";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    await api.post("/users", user);
    fetchUsers();
  };

  const updateUser = async (id, user) => {
    await api.put(`/users/${id}`, user);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management</h1>
      <UserForm onSubmit={addUser} />
      <UserList users={users} onDelete={deleteUser} onUpdate={updateUser} />
    </div>
  );
}
