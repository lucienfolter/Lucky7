import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const JOBS = {
  "1": { id: 1, title: "Plumber Needed - Kitchen Repair", rate: "₹600/hr", employer: "Ramesh Kumar" },
  "2": { id: 2, title: "Electrician for Wiring Work", rate: "₹500/hr", employer: "Priya Sharma" },
  "3": { id: 3, title: "Carpenter - Furniture Assembly", rate: "₹550/hr", employer: "Amit Patel" },
  "4": { id: 4, title: "Painter - 3BHK Apartment", rate: "₹450/hr", employer: "Sneha Desai" }
};

export default function Apply() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = JOBS[jobId] || { title: "Job", rate: "-", employer: "-" };

  const [form, setForm] = useState({
    fullName: "John Doe",
    phone: "+91 9876543210",
    yearsExp: "3",
    expectedRate: job.rate.replace("/hr", ""),
    cover: `Hi, I have experience in ${job.title.split(" ")[0]}. I can start tomorrow.`
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for "${job.title}" ✅`);
    navigate("/jobs");
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6">Apply to Job</h1>

        <div className="bg-white border border-green-300 rounded-2xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-green-800">{job.title}</h2>
          <p className="text-sm text-gray-600">Employer: {job.employer}</p>
          <p className="text-sm text-gray-600">Rate: {job.rate}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-green-300 rounded-2xl shadow p-8 space-y-4">
          <Row label="Full Name">
            <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </Row>

          <Row label="Phone Number">
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </Row>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Row label="Years of Experience">
              <input name="yearsExp" value={form.yearsExp} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </Row>
            <Row label="Expected Rate (₹/hr)">
              <input name="expectedRate" value={form.expectedRate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </Row>
          </div>

          <Row label="Cover Message">
            <textarea name="cover" value={form.cover} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg h-28" />
          </Row>

          <div className="flex gap-3">
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Submit Application</button>
            <button type="button" onClick={() => navigate("/jobs")} className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {children}
    </div>
  );
}
