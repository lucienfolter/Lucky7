import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    {
      label: "Active Jobs",
      value: "8",
      change: "+2 this week",
      gradient: "from-green-400 to-green-600",
      icon: "💼"
    },
    {
      label: "Total Applications",
      value: "35",
      change: "12 new today",
      gradient: "from-blue-400 to-blue-600",
      icon: "📝"
    },
    {
      label: "Workers Hired",
      value: "12",
      change: "This month",
      gradient: "from-purple-400 to-purple-600",
      icon: "👥"
    },
    {
      label: "Amount Spent",
      value: "₹45,500",
      change: "Last 30 days",
      gradient: "from-orange-400 to-red-600",
      icon: "💰"
    }
  ];

  const quickActions = [
    {
      title: "POST NEW JOB",
      description: "Create and publish a new job posting",
      path: "/employer-jobs",
      gradient: "from-green-400 to-green-600",
      icon: "➕"
    },
    {
      title: "MANAGE JOBS",
      description: "View and edit your job postings",
      path: "/employer-jobs",
      gradient: "from-blue-400 to-blue-600",
      icon: "📋"
    },
    {
      title: "MESSAGES",
      description: "Chat with workers",
      path: "/messages",
      gradient: "from-purple-400 to-purple-600",
      icon: "💬"
    },
    {
      title: "PAYMENTS",
      description: "Manage payment history",
      path: "/wallet",
      gradient: "from-orange-400 to-red-600",
      icon: "💳"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <header className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 animate-fade-in">
          {t('dashboard.employerTitle')}
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-2xl shadow-xl p-6 overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${stat.gradient} text-white font-semibold`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">{stat.label}</h3>
                <p className="text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl">
                  <div className={`relative h-32 bg-gradient-to-br ${action.gradient} p-6 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <span className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        {action.icon}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}