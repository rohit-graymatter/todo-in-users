import { useState } from "react";

export default function TodoForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    onSubmit(form);
    setForm({ name: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Todo Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
