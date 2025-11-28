import { useState } from "react";
import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerSettings() {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    alerts: true,
    darkmode: false
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <SidebarEmployer />

      <main className="flex-1 p-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Settings
        </h1>

        <div className="bg-white border border-green-300 rounded-xl shadow p-6 space-y-6">
          {Object.keys(settings).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center border-b pb-3"
            >
              <p className="capitalize">{key}</p>

              <button
                onClick={() => toggle(key)}
                className={`px-4 py-1 rounded-md text-white ${
                  settings[key] ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {settings[key] ? "ON" : "OFF"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
