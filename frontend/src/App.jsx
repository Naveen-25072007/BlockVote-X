import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home/Home";

// Authentication
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Student
import Student from "./pages/Student/Student";
import StudentElectionDetails from "./pages/Student/StudentElectionDetails";
import Dashboard from "./pages/Student/Dashboard";
import History from "./pages/Student/History";
import Profile from "./pages/Student/Profile";
import Vote from "./pages/Student/Vote";
import StudentResults from "./pages/Student/Results";

// Admin
import Admin from "./pages/Admin/Admin";

// Election
import CreateElection from "./pages/Election/CreateElection";
import ElectionList from "./pages/Election/ElectionList";
import ElectionDetails from "./pages/Election/ElectionDetails";

// Results
import Results from "./pages/Results/Results";

// Verify Students
import VerifyStudent from "./pages/VerifyStudent/VerifyStudent";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route path="/student" element={<Student />} />
      <Route
        path="/student/election/:id"
        element={<StudentElectionDetails />}
      />
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/student/history" element={<History />} />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/vote" element={<Vote />} />
      <Route path="/student/results" element={<StudentResults />} />

      {/* Admin */}
      <Route path="/admin" element={<Admin />} />

      {/* Election */}
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

      {/* Results */}
      <Route
        path="/admin/results"
        element={<Results />}
      />

      {/* Verify Students */}
      <Route
        path="/admin/verify-students"
        element={<VerifyStudent />}
      />
    </Routes>
  );
}

export default App;