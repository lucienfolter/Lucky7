import axios from "axios";
import { API_URL } from "../config/api";

// ----------------------
// GET ALL JOBS (Employee)
// ----------------------
export const getAllJobs = async () => {
  return await axios.get(`${API_URL}/jobs`);
};

// ---------------------------
// GET EMPLOYER'S OWN JOBS
// ---------------------------
export const getEmployerJobs = async (employerId) => {
  return await axios.get(`${API_URL}/jobs/employer/${employerId}`);
};

// -----------------------
// POST A NEW JOB (Employer)
// -----------------------
export const postJob = async (formData) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${API_URL}/jobs/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    }
  });
};


// -----------------------
// APPLY FOR A JOB (Employee)
// -----------------------
export const applyForJob = async (jobId, data) => {
  return await axios.post(`${API_URL}/jobs/apply/${jobId}`, data);
};

// -------------------------------------------
// GET APPLICATIONS RECEIVED BY AN EMPLOYER
// -------------------------------------------
export const getApplicationsForEmployer = async (employerId) => {
  return await axios.get(`${API_URL}/jobs/applications/${employerId}`);
};

// ------------------------------
// GET APPLICATIONS BY A WORKER
// ------------------------------
export const getMyApplications = async (employeeId) => {
  return await axios.get(`${API_URL}/applications/employee/${employeeId}`);
};
