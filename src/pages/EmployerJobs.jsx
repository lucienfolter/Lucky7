import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SidebarEmployer from "../Components/SidebarEmployer";
import ImageUploader from "../Components/ImageUploader";
import { postJob, getEmployerJobs } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

export default function EmployerJobs() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobImage, setJobImage] = useState(null);
  const [employerJobs, setEmployerJobs] = useState([]);

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

  // Image upload handler
  const handleImageUpload = (file, preview) => {
    setJobImage({ file, preview });
  };

  // 🔥 Fetch employer's jobs
  const loadEmployerJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getEmployerJobs(user._id, token);
      setEmployerJobs(res.data.jobs || []);
    } catch (error) {
      console.error("Failed to load employer jobs:", error);
    }
  };

  // Fetch jobs when user loads
  useEffect(() => {
    if (user?._id) {
      loadEmployerJobs();
    }
  }, [user]);

  // POST JOB
  const handlePostJob = async () => {
    try {
      const formData = new FormData();

      Object.keys(jobData).forEach((key) => {
        formData.append(key, jobData[key]);
      });

      if (jobImage?.file) {
        formData.append("image", jobImage.file);
      }

      const token = localStorage.getItem("token");
      await postJob(formData, token);

      alert("✅ Job posted successfully!");

      // ⭐ refresh job list instantly
      await loadEmployerJobs();

      // reset
      setShowPostJobModal(false);
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
      setJobImage(null);
    } catch (error) {
      console.error("Job post error:", error);
      alert("❌ Failed to post job.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <header className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("jobs.title")}
          </header>

          <button
            onClick={() => setShowPostJobModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            ➕ {t("jobs.postNewJob")}
          </button>
        </div>

        {/* JOB LIST */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>

          {employerJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Jobs Posted Yet
              </h3>
              <p className="text-gray-600">
                Click "Post New Job" to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {employerJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-600">{job.category}</p>
                  <p className="text-gray-600">📍 {job.location}</p>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* POST JOB MODAL */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Post New Job
              </h2>

              <button
                onClick={() => setShowPostJobModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full"
              >
                ✖
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) =>
                    setJobData({ ...jobData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Category *
                </label>
                <select
                  value={jobData.category}
                  onChange={(e) =>
                    setJobData({ ...jobData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl"
                >
                  <option value="">Select category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Painting">Painting</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Gardening">Gardening</option>
                </select>
              </div>

              <div className="border-2 border-dashed rounded-xl p-4 bg-blue-50/30">
                <ImageUploader
                  label="Job Image (Optional)"
                  onImageUpload={handleImageUpload}
                  existingImage={jobImage?.preview}
                  maxSize={5}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Description *
                </label>
                <textarea
                  value={jobData.description}
                  onChange={(e) =>
                    setJobData({ ...jobData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold">
                    Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={jobData.rate}
                    onChange={(e) =>
                      setJobData({ ...jobData, rate: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={jobData.duration}
                    onChange={(e) =>
                      setJobData({ ...jobData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Location *
                </label>
                <input
                  type="text"
                  value={jobData.location}
                  onChange={(e) =>
                    setJobData({ ...jobData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={jobData.date}
                  onChange={(e) =>
                    setJobData({ ...jobData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-yellow-50 border-2 rounded-xl">
                <input
                  type="checkbox"
                  checked={jobData.urgent}
                  onChange={(e) =>
                    setJobData({ ...jobData, urgent: e.target.checked })
                  }
                />
                <label className="text-sm font-semibold">
                  ⚡ Mark as urgent
                </label>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="flex-1 px-6 py-3 border-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handlePostJob}
                disabled={
                  !jobData.title || !jobData.category || !jobData.description
                }
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl"
              >
                🚀 Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
