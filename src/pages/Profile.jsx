import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function EmployerDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Active Job Posts",
      value: "8",
      change: "+2 this week",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="40" height="40">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      ),
      bgColor: "bg-green-100"
    },
    {
      label: "Total Applications",
      value: "35",
      change: "12 new today",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" width="40" height="40">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      bgColor: "bg-blue-100"
    },
    {
      label: "Workers Hired",
      value: "12",
      change: "This month",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" width="40" height="40">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      ),
      bgColor: "bg-yellow-100"
    },
    {
      label: "Amount Spent",
      value: "₹45,500",
      change: "Last 30 days",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" width="40" height="40">
          <path d="M21 5H3c-1.1 0-2 .9-2 2v11a3 3 0 003 3h16a3 3 0 003-3V7c0-1.1-.9-2-2-2zM3 18V7h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
        </svg>
      ),
      bgColor: "bg-purple-100"
    }
  ];

  const quickActions = [
    {
      title: "POST NEW JOB",
      description: "Create and publish a new job posting",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="60" height="60">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      ),
      path: "/employer-jobs",
      color: "green"
    },
    {
      title: "MANAGE JOBS",
      description: "View and edit your active job postings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" width="60" height="60">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      ),
      path: "/employer-jobs",
      color: "blue"
    },
    {
      title: "REVIEW APPLICATIONS",
      description: "Check applications from skilled workers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" width="60" height="60">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      path: "/employer-jobs",
      color: "orange"
    },
    {
      title: "MESSAGES",
      description: "Chat with workers and applicants",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" width="60" height="60">
          <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 00-2 2v20l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2H4z" />
        </svg>
      ),
      path: "/messages",
      color: "purple"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New application received",
      job: "Plumber Needed - Kitchen Repair",
      applicant: "Rajesh Kumar",
      time: "5 minutes ago",
      type: "application"
    },
    {
      id: 2,
      action: "Job posted successfully",
      job: "Electrician for Wiring Work",
      time: "2 hours ago",
      type: "job"
    },
    {
      id: 3,
      action: "Worker hired",
      job: "Carpenter - Furniture Assembly",
      applicant: "Suresh Patil",
      time: "Yesterday",
      type: "hire"
    },
    {
      id: 4,
      action: "Payment completed",
      job: "Painting - 2BHK",
      amount: "₹3,600",
      time: "2 days ago",
      type: "payment"
    }
  ];

  const topWorkers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      category: "Plumber",
      rating: 4.9,
      jobs: 45,
      rate: "₹600/hr"
    },
    {
      id: 2,
      name: "Amit Sharma",
      category: "Electrician",
      rating: 4.7,
      jobs: 38,
      rate: "₹550/hr"
    },
    {
      id: 3,
      name: "Suresh Patil",
      category: "Carpenter",
      rating: 4.8,
      jobs: 52,
      rate: "₹650/hr"
    }
  ];

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold text-green-700 mb-8">
          EMPLOYER'S DASHBOARD
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-green-700 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white border border-green-300 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-green-400 transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-green-700">{action.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-green-800">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "application" ? "bg-blue-500" :
                      activity.type === "job" ? "bg-green-500" :
                      activity.type === "hire" ? "bg-yellow-500" :
                      "bg-purple-500"
                    }`} />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.job}</p>
                      {activity.applicant && (
                        <p className="text-sm text-gray-600">by {activity.applicant}</p>
                      )}
                      {activity.amount && (
                        <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated Workers */}
          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Top Rated Workers</h3>
            <div className="space-y-4">
              {topWorkers.map(worker => (
                <div key={worker.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-400 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-700 text-lg">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{worker.name}</h4>
                        <p className="text-sm text-gray-500">{worker.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="text-sm font-semibold">{worker.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{worker.jobs} jobs completed</span>
                    <span className="font-semibold text-green-600">{worker.rate}</span>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}