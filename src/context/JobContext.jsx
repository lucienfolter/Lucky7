import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const JobContext = createContext();

// Custom hook
export const useJobs = () => useContext(JobContext);

// Provider
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("jobs");
    if (stored) {
      setJobs(JSON.parse(stored));
    }
  }, []);

  // Save jobs to localStorage
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Add Job
  const addJob = (job) => {
    const newJobs = [...jobs, { id: Date.now(), ...job }];
    setJobs(newJobs);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};
