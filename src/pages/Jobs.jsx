import { useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function Jobs() {
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
      description: "Need a skilled plumber to fix kitchen sink and pipes. Immediate requirement."
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

  const myApplications = [
    {
      id: 1,
      title: "Plumber Needed - Kitchen Repair",
      employer: "Ramesh Kumar",
      status: "Pending",
      appliedDate: "2 days ago",
      rate: "₹600/hr"
    },
    {
      id: 2,
      title: "Electrician for Wiring Work",
      employer: "Priya Sharma",
      status: "Accepted",
      appliedDate: "5 days ago",
      rate: "₹500/hr"
    }
  ];

  const categories = ["all", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold text-green-700 mb-8">
          JOB OPPORTUNITIES
        </header>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "browse"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-400"
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "applications"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-400"
            }`}
          >
            My Applications
          </button>
        </div>

        {activeTab === "browse" && (
          <div>
            <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white border border-green-300 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-green-800">{job.title}</h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Employer:</span> {job.employer}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Location:</span> {job.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{job.rate}</p>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {job.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {job.date}
                      </span>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-semibold">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-4">
            {myApplications.map(app => (
              <div
                key={app.id}
                className="bg-white border border-green-300 rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{app.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Employer:</span> {app.employer}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Applied:</span> {app.appliedDate}
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
                      {app.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                    Message Employer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}