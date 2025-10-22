import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-in-users-backend.onrender.com/api",
});

export default api;
