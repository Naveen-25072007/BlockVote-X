import api from "./api";

// ==========================================
// Profile
// ==========================================
export const getProfile = () =>
  api.get("/users/profile");

// ==========================================
// Get All Students
// ==========================================
export const getStudents = () =>
  api.get("/users/students");

// ==========================================
// Verify Student
// ==========================================
export const verifyStudent = (id) =>
  api.put(`/users/students/${id}/verify`);