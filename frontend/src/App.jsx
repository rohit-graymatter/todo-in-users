import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import TodosPage from "./pages/TodosPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id/todos" element={<TodosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
