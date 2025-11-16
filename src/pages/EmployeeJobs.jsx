import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar from "../Components/Sidebar";

export default function EmployeeJobs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Plumber Needed - Kitchen Repair",
      employer: "Ramesh Kumar",
      location: "Andheri West, Mumbai",
      category: "Plumbing",
      rate: "₹600/hr",
      duration: "2-3 hours",
      date: "Tomorrow",
      urgent: true,
      description: "Need a skilled plumber to fix kitchen sink and pipes. Immediate requirement.",
      image: null
    },
    {
      id: 2,
      title: "Electrician for Wiring Work",
      employer: "Priya Sharma",
      location: "Bandra East, Mumbai",
      category: "Electrical",
      rate: "₹500/hr",
      duration: "4-5 hours",
      date: "This Weekend",
      urgent: false,
      description: "Complete rewiring of 2BHK apartment. Safety certification required."
    },
    {
      id: 3,
      title: "Carpenter - Furniture Assembly",
      employer: "Amit Patel",
      location: "Powai, Mumbai",
      category: "Carpentry",
      rate: "₹550/hr",
      duration: "Full Day",
      date: "Next Week",
      urgent: false,
      description: "Assemble new furniture and repair existing wooden cabinets."
    },
    {
      id: 4,
      title: "Painter - 3BHK Apartment",
      employer: "Sneha Desai",
      location: "Goregaon, Mumbai",
      category: "Painting",
      rate: "₹450/hr",
      duration: "3 Days",
      date: "15 Dec 2025",
      urgent: false,
      description: "Complete painting of 3BHK flat including preparation work."
    }
  ];

  const [myApplications, setMyApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: "Plumber Needed - Kitchen Repair",
      employer: "Ramesh Kumar",
      status: "Pending",
      appliedDate: "2 days ago",
      rate: "₹600/hr"
    }
  ]);

  const categories = ["all", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (job) => {
    // Check if already applied
    const alreadyApplied = myApplications.some(app => app.jobId === job.id);
    
    if (alreadyApplied) {
      alert('❌ You have already applied for this job!');
      return;
    }

    // Add to applications
    const newApplication = {
      id: myApplications.length + 1,
      jobId: job.id,
      jobTitle: job.title,
      employer: job.employer,
      status: "Pending",
      appliedDate: "Just now",
      rate: job.rate
    };

    setMyApplications([...myApplications, newApplication]);
    alert('✅ Application submitted successfully!');
    
    // Switch to My Applications tab to see the result
    setTimeout(() => setActiveTab("applications"), 1000);
  };

  const isApplied = (jobId) => {
    return myApplications.some(app => app.jobId === jobId);
  };

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
            {/* Search and Filter */}
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
                    key={job.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                          {job.urgent && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                              ⚡ URGENT
                            </span>
                          )}
                          {isApplied(job.id) && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                              ✓ Applied
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">👤 Employer:</span> {job.employer}
                        </p>
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
                      <div className="flex gap-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {job.category}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          📅 {job.date}
                        </span>
                      </div>
                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplied(job.id)}
                        className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                          isApplied(job.id)
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                        }`}
                      >
                        {isApplied(job.id) ? '✓ Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-200">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
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
                  key={app.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{app.jobTitle}</h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">👤 Employer:</span> {app.employer}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">📅 Applied:</span> {app.appliedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 mb-2">{app.rate}</p>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {app.status === "Pending" && "⏳ "}
                        {app.status === "Accepted" && "✅ "}
                        {app.status === "Rejected" && "❌ "}
                        {app.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                    <button className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all font-semibold">
                      💬 Message Employer
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-200">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-6">Start applying to jobs to see them here!</p>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}