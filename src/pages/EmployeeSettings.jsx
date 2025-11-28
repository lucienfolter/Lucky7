import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar from "../Components/Sidebar";

export default function EmployeeSettings() {
  const { t } = useTranslation();
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          SETTINGS
        </header>

        <div className="max-w-4xl space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔔 Notification Preferences</h2>
            
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive text messages' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive app notifications' },
                { key: 'jobAlerts', label: 'Job Alerts', desc: 'Get notified about new jobs' },
                { key: 'messageAlerts', label: 'Message Alerts', desc: 'Get notified about new messages' },
                { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Get notified about payments' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      settings[item.key] ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings[item.key] ? "translate-x-7" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔒 Account Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
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

              <div className="py-3">
                <h3 className="font-semibold text-gray-800 mb-2">Change Password</h3>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-semibold">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Preferences</h2>
            
            <div className="space-y-4">
              <div className="py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Language</h3>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full md:w-64 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                >
                  <option value="english">English</option>
                  <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                  <option value="hindi">हिंदी (Hindi)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
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

          {/* Account Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Danger Zone</h2>
            <p className="text-sm text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}