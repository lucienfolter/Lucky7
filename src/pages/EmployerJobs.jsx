import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import SidebarEmployer from "../Components/SidebarEmployer";
import axios from "axios";

export default function EmployerJobs() {
  const { t } = useTranslation();
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    description: '',
    rate: '',
    duration: '',
    location: '',
    date: '',
    urgent: false
  });

  // Fetch all posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // POST Job
  const handlePostJob = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", jobData);
      alert("Job posted successfully!");

      setJobs([response.data.job, ...jobs]);
      setShowPostJobModal(false);

      setJobData({
        title: '',
        category: '',
        description: '',
        rate: '',
        duration: '',
        location: '',
        date: '',
        urgent: false
      });
    } catch (error) {
      alert("Failed to post job");
      console.error(error);
    }
  };

  // DELETE Job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <header className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('jobs.title')}
          </header>

          <button
            onClick={() => setShowPostJobModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('jobs.postNewJob')}
          </button>
        </div>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Jobs Posted Yet</h3>
              <p className="text-gray-600">Click "Post New Job" to get started!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Category:</strong> {job.category}</p>
                  <p><strong>Rate:</strong> ₹{job.rate}</p>
                  <p><strong>Duration:</strong> {job.duration}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Date:</strong> {job.date}</p>
                  {job.urgent && <span className="text-red-600 font-bold">URGENT</span>}
                </div>

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* POST JOB MODAL — unchanged UI */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {showPostJobModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job Title"
          className="border p-3 rounded-lg"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg"
          value={jobData.category}
          onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
        />

        <input
          type="text"
          placeholder="Rate (₹)"
          className="border p-3 rounded-lg"
          value={jobData.rate}
          onChange={(e) => setJobData({ ...jobData, rate: e.target.value })}
        />

        <input
          type="text"
          placeholder="Duration"
          className="border p-3 rounded-lg"
          value={jobData.duration}
          onChange={(e) => setJobData({ ...jobData, duration: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-3 rounded-lg"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
        />

        <input
          type="date"
          className="border p-3 rounded-lg"
          value={jobData.date}
          onChange={(e) => setJobData({ ...jobData, date: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Job Description"
        className="border rounded-lg p-3 w-full mt-4"
        rows="4"
        value={jobData.description}
        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
      />

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={jobData.urgent}
          onChange={(e) => setJobData({ ...jobData, urgent: e.target.checked })}
        />
        <span>Mark as urgent</span>
      </label>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setShowPostJobModal(false)}
          className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={handlePostJob}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl"
        >
          Post Job
        </button>
      </div>
    </div>
  </div>
)}


            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handlePostJob}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl"
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
