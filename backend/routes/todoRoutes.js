import express from "express";
import {
  getTodosByUser,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/:userId", getTodosByUser);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
