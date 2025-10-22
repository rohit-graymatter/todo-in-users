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
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Todo Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="col-md-4">
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-primary w-100">
          Add Todo
        </button>
      </div>
    </form>
  );
}
