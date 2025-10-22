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
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-2">
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-primary w-100">
          Add
        </button>
      </div>
    </form>
  );
}
