import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import UsersPage from "./pages/UsersPage";
import TodosPage from "./pages/TodosPage";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  useEffect(() => {
    // Connect to SSE endpoint for notifications
    const eventSource = new EventSource("http://localhost:5000/api/notifications");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      toast.info(data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    eventSource.onerror = () => {
      console.error("EventSource failed. Closing connection.");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id/todos" element={<TodosPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
