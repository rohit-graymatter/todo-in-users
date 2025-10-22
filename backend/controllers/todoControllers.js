import Todo from "../models/todoModel.js";

// Get todos for a user
export const getTodosByUser = async (req, res) => {
  const { userId } = req.params;
  const todos = await Todo.find({ user: userId });
  res.json(todos);
};

// Create todo
export const createTodo = async (req, res) => {
  const { userId, name, date } = req.body;
  const todo = new Todo({ user: userId, name, date });
  await todo.save();
  res.status(201).json(todo);
};

// Update todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Delete todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
};
