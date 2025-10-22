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
    <table border="1" cellPadding="8">
      <thead>
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
                  <button onClick={() => saveEdit(t._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(t)}>Edit</button>
                  <button onClick={() => onDelete(t._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
