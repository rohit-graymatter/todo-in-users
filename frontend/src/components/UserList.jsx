import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserList({ users, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const startEdit = (user) => {
    setEditingId(user._id);
    setEditData(user);
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
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td
              onClick={() => navigate(`/users/${u._id}/todos`)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {editingId === u._id ? (
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="form-control"
                />
              ) : (
                u.name
              )}
            </td>
            <td>
              {editingId === u._id ? (
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="form-control"
                />
              ) : (
                u.email
              )}
            </td>
            <td>
              {editingId === u._id ? (
                <input
                  value={editData.age}
                  onChange={(e) =>
                    setEditData({ ...editData, age: e.target.value })
                  }
                  className="form-control"
                />
              ) : (
                u.age
              )}
            </td>
            <td>
              {editingId === u._id ? (
                <>
                  <button
                    onClick={() => saveEdit(u._id)}
                    className="btn btn-success btn-sm me-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(u)}
                    className="btn btn-warning btn-sm me-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(u._id)}
                    className="btn btn-danger btn-sm"
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
