import { useState } from "react";

export default function TodoList({ todos, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditData(todo);
  };

  const saveEdit = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((t) => (
          <tr key={t._id}>
            <td>
              {editingId === t._id ? (
                <input
                  className="form-control"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              ) : (
                t.name
              )}
            </td>
            <td>
              {editingId === t._id ? (
                <input
                  type="date"
                  className="form-control"
                  value={editData.date?.split("T")[0]}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                />
              ) : (
                new Date(t.date).toLocaleDateString()
              )}
            </td>
            <td>
              {editingId === t._id ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-1"
                    onClick={() => saveEdit(t._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(t._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
