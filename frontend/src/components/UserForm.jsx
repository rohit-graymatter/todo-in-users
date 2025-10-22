import { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.age) return;
    onSubmit(form);
    setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <button type="submit">Add User</button>
    </form>
  );
}
