import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SidebarEmployer from "../Components/SidebarEmployer";
import { getApplicationsForEmployer } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();   // No token needed

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH APPLICATIONS
  useEffect(() => {
    if (!user?._id) return; // Avoid calling API before user loads

    const fetchApps = async () => {
      try {
        const res = await getApplicationsForEmployer(user._id);
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [user]);

  // COMPUTE DASHBOARD STATS
  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      gradient: "from-green-400 to-green-600",
      icon: "📝",
    },
    {
      label: "Accepted",
      value: applications.filter((a) => a.status === "Accepted").length,
      gradient: "from-blue-400 to-blue-600",
      icon: "✅",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "Pending").length,
      gradient: "from-purple-400 to-purple-600",
      icon: "⏳",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "Rejected").length,
      gradient: "from-orange-400 to-red-600",
      icon: "❌",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <header className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Employer Dashboard
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl p-6 overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`}
              />
              <div className="relative">
                <span className="text-3xl">{stat.icon}</span>
                <h3 className="text-gray-600 text-sm mt-2">{stat.label}</h3>
                <p className="text-4xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Incoming Applications</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-500">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {app.jobId?.title}
                      </h3>

                      <p className="text-gray-600">
                        👤 <b>Applicant:</b> {app.employeeId?.name || "Unknown"}
                      </p>

                      <p className="text-gray-600 mt-1">
                        📅 Applied on:{" "}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>

                      <p className="text-gray-600 mt-1">
                        📝 <b>Status:</b> {app.status}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/messages")}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg"
                    >
                      💬 Message Worker
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
