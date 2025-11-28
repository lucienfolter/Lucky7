import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Sidebar from "../Components/Sidebar";
import DashboardCardGrid from "../Components/DashboardCardGrid";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      ),
      title: t('dashboard.profileManagement'),
      text: t('dashboard.profileDesc'),
      path: "/employee-profile", // ✅ FIXED - Employee profile
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
          <path d="M20.285 6.709l-1.998-1.998L9 13.998l-3.293-3.293-1.998 1.998L9 17.994z" />
        </svg>
      ),
      title: t('dashboard.requestsHires'),
      text: t('dashboard.requestsDesc'),
      path: "/employee-jobs", // ✅ FIXED - Employee jobs
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
          <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 00-2 2v20l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2H4z" />
        </svg>
      ),
      title: t('dashboard.inbox'),
      text: t('dashboard.inboxDesc'),
      path: "/employee-messages", // ✅ FIXED - Employee messages
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="60" height="60">
          <path d="M21 5H3c-1.1 0-2 .9-2 2v11a3 3 0 003 3h16a3 3 0 003-3V7c0-1.1-.9-2-2-2zM3 18V7h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
        </svg>
      ),
      title: t('dashboard.wallet'),
      text: t('dashboard.walletDesc'),
      path: "/employee-wallet", // ✅ FIXED - Employee wallet
      gradient: "from-yellow-400 to-orange-600"
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-start p-10">
        <header className="text-5xl font-extrabold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-12 animate-fade-in">
          {t('dashboard.employeeTitle')}
        </header>

        <DashboardCardGrid cards={cards} navigate={navigate} />
      </main>
    </div>
  );
}