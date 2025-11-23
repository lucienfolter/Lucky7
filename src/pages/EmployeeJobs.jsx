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

  const categories = ["all", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleApply = (job) => {
    const alreadyApplied = myApplications.some(app => app.jobId === job._id);

    if (alreadyApplied) {
      alert("❌ You have already applied for this job!");
      return;
    }

    const newApplication = {
      id: myApplications.length + 1,
      jobId: job._id,
      jobTitle: job.title,
      employer: "Employer", // update when auth is added
      status: "Pending",
      appliedDate: "Just now",
      rate: job.rate
    };

    setMyApplications([...myApplications, newApplication]);
    alert("✅ Application submitted successfully!");

    setTimeout(() => setActiveTab("applications"), 1000);
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
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        </div>

                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">📍 Location:</span> {job.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{job.rate}</p>
                        <p className="text-sm text-gray-500">⏱️ {job.duration}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.category}
                      </span>
                      <button
                        onClick={() => handleApply(job)}
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

        {/* My Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {myApplications.length > 0 ? (
              myApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{app.jobTitle}</h3>
                  <p className="text-gray-600 mt-2">📅 Applied: {app.appliedDate}</p>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-gray-600">No applications yet</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
