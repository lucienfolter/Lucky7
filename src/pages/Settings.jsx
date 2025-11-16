import { useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    jobAlerts: true,
    messageAlerts: true,
    paymentAlerts: true,
    darkMode: false,
    language: "english",
    twoFactorAuth: false
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleLanguageChange = (e) => {
    setSettings({
      ...settings,
      language: e.target.value
    });
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold text-green-700 mb-8">
          SETTINGS
        </header>

        <div className="max-w-4xl space-y-6">
          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.emailNotifications ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive text messages</p>
                </div>
                <button
                  onClick={() => handleToggle("smsNotifications")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.smsNotifications ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.smsNotifications ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Receive app notifications</p>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.pushNotifications ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.pushNotifications ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Job Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about new jobs</p>
                </div>
                <button
                  onClick={() => handleToggle("jobAlerts")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.jobAlerts ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.jobAlerts ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Message Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about new messages</p>
                </div>
                <button
                  onClick={() => handleToggle("messageAlerts")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.messageAlerts ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.messageAlerts ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Payment Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about payments</p>
                </div>
                <button
                  onClick={() => handleToggle("paymentAlerts")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.paymentAlerts ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.paymentAlerts ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Account Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <button
                  onClick={() => handleToggle("twoFactorAuth")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.twoFactorAuth ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.twoFactorAuth ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Change Password</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm">
                  Update Password
                </button>
              </div>

              <div className="py-3">
                <h3 className="font-semibold text-gray-800 mb-2">Active Sessions</h3>
                <p className="text-sm text-gray-600 mb-3">Manage devices where you're logged in</p>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-sm">
                  View All Sessions
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Preferences</h2>
            
            <div className="space-y-4">
              <div className="py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Language</h3>
                <select
                  value={settings.language}
                  onChange={handleLanguageChange}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="marathi">Marathi</option>
                  <option value="gujarati">Gujarati</option>
                  <option value="tamil">Tamil</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.darkMode ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.darkMode ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Privacy & Data</h2>
            
            <div className="space-y-4">
              <div className="py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Download Your Data</h3>
                <p className="text-sm text-gray-600 mb-3">Get a copy of your data</p>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-sm">
                  Request Data Export
                </button>
              </div>

              <div className="py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Privacy Policy</h3>
                <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                  View Privacy Policy →
                </button>
              </div>

              <div className="py-3">
                <h3 className="font-semibold text-red-600 mb-2">Delete Account</h3>
                <p className="text-sm text-gray-600 mb-3">Permanently delete your account and data</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Support</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-gray-800">Help Center</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-gray-800">Contact Support</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-semibold text-gray-800">Terms of Service</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}