import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../Components/Sidebar";
import { getAllJobs, applyForJob, getMyApplications } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

export default function EmployeeJobs() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [jobs, setJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ⭐ FETCH JOBS + APPLICATIONS
  const loadJobs = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        getAllJobs(),
        getMyApplications(user._id, token),
      ]);

      setJobs(jobsRes.data.jobs || []);
      setMyApplications(appsRes.data.applications || []);
    } catch (error) {
      console.error("❌ Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) loadJobs();
  }, [user]);

  // ⭐ Check if applied
  const isApplied = (jobId) =>
    myApplications.some((a) => a.jobId?._id === jobId);

  // ⭐ Apply for a job
  const handleApply = async (job) => {
    if (isApplied(job._id)) {
      alert("❌ You already applied for this job!");
      return;
    }

    try {
      await applyForJob(
        job._id,
        {
          coverLetter: "",
          proposedRate: job.rate,
        },
        token
      );

      alert("✅ Application submitted!");

      // Add to list instantly
      setMyApplications((prev) => [
        ...prev,
        {
          jobId: job,
          status: "Pending",
          appliedAt: new Date().toISOString(),
        },
      ]);

      setActiveTab("applications");
    } catch (error) {
      console.error("Apply error:", error);
      alert("❌ Failed to apply!");
    }
  };

  // ⭐ SAFE FILTERS (No Crash)
  const filteredJobs = jobs.filter((job) => {
    const title = job.title || "";
    const desc = job.description || "";
    const category = job.category || "";

    const matchesText =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesText && matchesCategory;
  });

  const categories = [
    "all",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Cleaning",
    "Gardening",
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading jobs...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          Job Opportunities
        </header>

        {/* ⭐ Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-3 rounded-xl font-semibold ${
              activeTab === "browse"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-300 text-gray-700"
            }`}
          >
            Browse Jobs ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 rounded-xl font-semibold ${
              activeTab === "applications"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-300 text-gray-700"
            }`}
          >
            My Applications ({myApplications.length})
          </button>
        </div>

        {/* ⭐ BROWSE JOBS */}
        {activeTab === "browse" && (
          <div>
            {/* Search + Category */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 rounded-xl"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 rounded-xl"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ⭐ Job List */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-xl p-6 border border-green-200 hover:shadow-2xl"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p className="text-gray-600">📍 {job.location}</p>
                        <p className="text-gray-600">🧰 {job.category}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ₹{job.rate}
                        </p>
                        <p className="text-gray-500">{job.duration}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mt-4">{job.description}</p>

                    <div className="flex justify-between items-center mt-4 border-t pt-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {job.category}
                      </span>

                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplied(job._id)}
                        className={`px-6 py-2 rounded-xl font-semibold ${
                          isApplied(job._id)
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-600 text-white shadow-lg"
                        }`}
                      >
                        {isApplied(job._id) ? "✓ Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No jobs found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ⭐ APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {myApplications.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-xl shadow">
                <p className="text-xl text-gray-700 mb-2">
                  No applications yet
                </p>
                <p className="text-gray-600">
                  Apply to jobs to see them here.
                </p>
              </div>
            ) : (
              myApplications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-xl p-6 border border-blue-200"
                >
                  <h3 className="text-xl font-bold">
                    {app.jobId?.title}
                  </h3>
                  <p>📅 Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                  <p>
                    📝 Status:{" "}
                    <span className="font-semibold">
                      {app.status || "Pending"}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
