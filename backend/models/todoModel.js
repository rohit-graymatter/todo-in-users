import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
