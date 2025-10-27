import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import Todo from "./models/todoModel.js";
import User from "./models/userModel.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ========= Real-time Notifications (SSE + Mongo Watch) =========
const clients = [];

app.get("/api/notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push(res);

  req.on("close", () => {
    const index = clients.indexOf(res);
    if (index !== -1) clients.splice(index, 1);
  });
});

mongoose.connection.once("open", async () => {
  console.log("Watching Todos for changes...");

  const changeStream = Todo.watch([], { fullDocument: "updateLookup" });

  changeStream.on("change", async (change) => {
    try {
      let message = "";
      const todo = change.fullDocument;

      if (!todo) return;

      const user = await User.findById(todo.user);

      switch (change.operationType) {
        case "insert":
          message = `${user.name} just added a new todo: "${todo.name}"`;
          break;
        case "update":
          message = `${user.name} just updated todo: "${todo.name}"`;
          break;
        case "delete":
          message = `A todo was deleted by ${user.name}`;
          break;
        default:
          message = "A todo was modified.";
      }

      clients.forEach((client) => {
        client.write(`data: ${JSON.stringify({ message })}\n\n`);
      });
    } catch (err) {
      console.error("Error in change stream:", err);
    }
  });
});
// ============================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
