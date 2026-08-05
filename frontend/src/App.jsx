import { Routes, Route } from "react-router-dom";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import StudentRoute from "./routes/StudentRoute";

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
import Candidates from "./pages/Admin/Candidates";
import BlockchainExplorer from "./pages/Admin/BlockchainExplorer";
import BlockchainIntegrity from "./pages/Admin/BlockchainIntegrity/BlockchainIntegrity";

// Election
import CreateElection from "./pages/Election/CreateElection";
import ElectionList from "./pages/Election/ElectionList";
import ElectionDetails from "./pages/Election/ElectionDetails";

// Results
import Results from "./pages/Results/Results";

// Verify Students
import VerifyStudent from "./pages/Student/VerifyStudent/VerifyStudent";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= STUDENT ================= */}

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <Student />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <Dashboard />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/election/:id"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <StudentElectionDetails />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/history"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <History />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <Profile />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/vote"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <Vote />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/results"
        element={
          <ProtectedRoute>
            <StudentRoute>
              <StudentResults />
            </StudentRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-election"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <CreateElection />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/elections"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ElectionList />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/election/:id"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ElectionDetails />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/candidates/:electionId"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Candidates />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/results"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Results />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/verify-students"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <VerifyStudent />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      {/* Blockchain Explorer */}

      <Route
        path="/admin/blockchain"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <BlockchainExplorer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      {/* Blockchain Integrity */}

      <Route
        path="/admin/blockchain-integrity"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <BlockchainIntegrity />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;