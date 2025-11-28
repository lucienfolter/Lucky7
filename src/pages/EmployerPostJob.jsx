import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SidebarEmployer from "../Components/SidebarEmployer";
import axios from "axios";

export default function EmployerJobs() {
  const { t } = useTranslation();
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    description: "",
    rate: "",
    duration: "",
    location: "",
    date: "",
    urgent: false,
  });

  // Handle input
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setJobData({ ...jobData, urgent: !jobData.urgent });
  };

  // ---------------- FETCH ONLY EMPLOYER'S JOBS (FIXED) ----------------
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // BACKEND RETURNS: { success: true, jobs: [...] }
        setJobs(response.data.jobs || []); // FIXED
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // ---------------- POST JOB (FIX: include token) ----------------
  const handlePostJob = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Job posted successfully!");

      // Add new job to UI state
      setJobs([response.data.job, ...jobs]);
      setShowPostJobModal(false);

      // Reset form
      setJobData({
        title: "",
        category: "",
        description: "",
        rate: "",
        duration: "",
        location: "",
        date: "",
        urgent: false,
      });
    } catch (error) {
      alert("Failed to post job");
      console.error("Post error:", error);
    }
  };

  // ---------------- DELETE JOB (Works now) ----------------
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove from UI
      setJobs(jobs.filter((job) => job._id !== jobId));

      alert("Job deleted successfully!");
    } catch (error) {
      alert("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700">
            {t("jobs.title")}
          </h1>

          <button
            onClick={() => setShowPostJobModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold shadow"
          >
            + Post New Job
          </button>
        </div>

        {/* Job List */}
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No jobs posted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <p className="text-gray-700 mt-1">{job.description}</p>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>Category:</strong> {job.category}
                  </li>
                  <li>
                    <strong>Rate:</strong> ₹{job.rate}
                  </li>
                  <li>
                    <strong>Duration:</strong> {job.duration}
                  </li>
                  <li>
                    <strong>Location:</strong> {job.location}
                  </li>
                  <li>
                    <strong>Date:</strong> {job.date}
                  </li>
                </ul>

                {job.urgent && (
                  <p className="mt-2 text-red-600 font-bold">🚨 URGENT</p>
                )}

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Post a New Job
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Job Title" name="title" value={jobData.title} onChange={handleChange} />
              <Input label="Category" name="category" value={jobData.category} onChange={handleChange} />
              <Input label="Daily Rate (₹)" name="rate" value={jobData.rate} onChange={handleChange} />
              <Input label="Duration" name="duration" value={jobData.duration} onChange={handleChange} />
              <Input label="Location" name="location" value={jobData.location} onChange={handleChange} />
              <Input label="Date" type="date" name="date" value={jobData.date} onChange={handleChange} />

              <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">Job Description</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Describe the work..."
                />
              </div>

              <div className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" checked={jobData.urgent} onChange={handleCheckbox} />
                <span className="font-semibold">Mark as Urgent</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handlePostJob}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input {...rest} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}
