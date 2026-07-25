import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home/Home";

// Authentication
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Dashboards
import Student from "./pages/Student/Student";
import Admin from "./pages/Admin/Admin";

// Election Pages
import CreateElection from "./pages/Election/CreateElection";
import ElectionList from "./pages/Election/ElectionList";
import ElectionDetails from "./pages/Election/ElectionDetails";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route path="/student" element={<Student />} />
      <Route path="/admin" element={<Admin />} />

      {/* Election Management */}
      <Route
        path="/admin/create-election"
        element={<CreateElection />}
      />

      <Route
        path="/admin/elections"
        element={<ElectionList />}
      />

      <Route
        path="/admin/election/:id"
        element={<ElectionDetails />}
      />

    </Routes>
  );
}

export default App;