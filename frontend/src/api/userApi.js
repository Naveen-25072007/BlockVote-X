import api from "./api";

// Profile
export const getProfile = () =>
  api.get("/users/profile");

// Students
export const getStudents = () =>
  api.get("/users/students");

// Verify
export const verifyStudent = (id) =>
  api.put(`/users/verify/${id}`);