  import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

export default function EmployeeJobs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myApplications, setMyApplications] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState("");

  const categories = ["all", "Plumbing", "Electrical", "Carpentry", "House Cleaning", "Appliance Repair", "Painting", "Others"];
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      
      // Extract user's applications
      const userId = getUserIdFromToken();
      const userApps = [];
      res.data.forEach(job => {
        const userApp = job.applications?.find(app => app.employee._id === userId);
        if (userApp) {
          userApps.push({
            ...userApp,
            jobId: job._id,
            jobTitle: job.title,
            employerName: job.employer?.fullName || 'Employer',
            rate: job.rate
          });
        }
      });
      setMyApplications(userApps);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setApplicationMessage("");
    setShowApplyModal(true);
  };

  const handleApply = async () => {
    if (!selectedJob) return;

    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${selectedJob._id}/apply`,
        { message: applicationMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Application submitted successfully!");
      setShowApplyModal(false);
      fetchJobs(); // Refresh to update applications
    } catch (error) {
      alert(error.response?.data?.message || "❌ Failed to submit application");
    }
  };

  const isApplied = (jobId) => {
    return myApplications.some(app => app.jobId === jobId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          JOB OPPORTUNITIES
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "browse"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400"
            }`}
          >
            Browse Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "applications"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400"
            }`}
          >
            My Applications ({myApplications.length})
          </button>
        </div>

        {/* Browse Jobs Tab */}
        {activeTab === "browse" && (
          <div>
            {/* Search + Filter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-green-200">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="🔍 Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div
                    key={job._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    {job.image?.url && (
                      <img 
                        src={`http://localhost:5000${job.image.url}`}
                        alt={job.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                          {job.urgent && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">📍 Location:</span> {job.location}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">👤 Employer:</span> {job.employer?.fullName || job.employer?.companyName || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{job.rate}</p>
                        <p className="text-sm text-gray-500">⏱️ {job.duration || 'N/A'}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex gap-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {job.category}
                        </span>
                        {job.date && (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            📅 {job.date}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => openApplyModal(job)}
                        disabled={isApplied(job._id)}
                        className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                          isApplied(job._id)
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg"
                        }`}
                      >
                        {isApplied(job._id) ? "✓ Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-gray-600">No jobs found</div>
              )}
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {myApplications.length > 0 ? (
              myApplications.map(app => (
                <div
                  key={app._id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{app.jobTitle}</h3>
                      <p className="text-gray-600">Employer: {app.employerName}</p>
                      <p className="text-gray-600">Rate: ₹{app.rate}</p>
                      <p className="text-gray-600 text-sm">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  {app.message && (
                    <p className="text-sm text-gray-700 italic">Your message: "{app.message}"</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-gray-600">No applications yet</div>
            )}
          </div>
        )}
      </main>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Apply for Job</h2>
            
            <div className="mb-4">
              <h3 className="font-bold text-lg">{selectedJob.title}</h3>
              <p className="text-gray-600">Rate: ₹{selectedJob.rate}</p>
              <p className="text-gray-600">Location: {selectedJob.location}</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Message to Employer (Optional)</label>
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                placeholder="Introduce yourself and explain why you're a good fit..."
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}