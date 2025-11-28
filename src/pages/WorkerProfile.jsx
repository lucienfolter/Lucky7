import { useParams, useNavigate } from "react-router-dom";
import SidebarEmployer from "../Components/SidebarEmployer";

const WORKERS = {
  "101": {
    id: 101,
    name: "Ramesh Kumar",
    role: "Plumber",
    rating: 4.8,
    experience: "3 years",
    location: "Andheri West, Mumbai",
    hourlyRate: "₹600/hr",
    jobsCompleted: 42,
    bio: "Skilled plumber with experience in kitchen/bathroom repairs, pipeline installation and leak detection."
  },
  "102": {
    id: 102,
    name: "Aman Gupta",
    role: "Plumber",
    rating: 4.6,
    experience: "2 years",
    location: "Bandra East, Mumbai",
    hourlyRate: "₹550/hr",
    jobsCompleted: 30,
    bio: "Detail-oriented plumber specializing in sink, tap and RO installations."
  },
  "104": {
    id: 104,
    name: "Vikas",
    role: "Electrician",
    rating: 4.7,
    experience: "5 years",
    location: "Whitefield, Bangalore",
    hourlyRate: "₹650/hr",
    jobsCompleted: 55,
    bio: "Certified electrician comfortable with rewiring, MCBs, safety audits and appliance installs."
  }
};

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const w = WORKERS[id] || {
    name: "Worker",
    role: "-",
    rating: "-",
    experience: "-",
    location: "-",
    hourlyRate: "-",
    jobsCompleted: "-",
    bio: "No data."
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <SidebarEmployer />

      <main className="flex-1 p-10 max-w-4xl">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            {w.name}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        <div className="bg-white border border-green-300 rounded-2xl shadow p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-700">
              {w.name?.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-green-800">{w.role}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>⭐ {w.rating}</span>
                <span>• {w.experience}</span>
                <span>• {w.location}</span>
                <span>• {w.hourlyRate}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Jobs Completed: <b>{w.jobsCompleted}</b>
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">{w.bio}</p>
        </div>

        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            Hire
          </button>
          <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50">
            Message
          </button>
        </div>
      </main>
    </div>
  );
}
