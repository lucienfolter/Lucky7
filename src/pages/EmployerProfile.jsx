import { useState } from "react";
import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerProfile() {
  const [company, setCompany] = useState({
    companyName: "ABC Constructions",
    ownerName: "Ravi Kumar",
    email: "abc.constructions@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, Karnataka",
    industry: "Construction",
    employeesCount: "25",
    about:
      "We are a mid-scale construction firm hiring skilled workers across plumbing, carpentry & electrician roles.",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setEditing(false);
    alert("Profile Saved ✅");
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <SidebarEmployer />

      <main className="flex-1 p-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Employer Profile
        </h1>

        <div className="bg-white shadow border border-green-300 rounded-xl p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-700">
              Company Details
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Company Name"
              name="companyName"
              value={company.companyName}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="Owner Name"
              name="ownerName"
              value={company.ownerName}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={company.email}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phone"
              value={company.phone}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              value={company.location}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="Industry"
              name="industry"
              value={company.industry}
              disabled={!editing}
              onChange={handleChange}
            />
            <Input
              label="No. of Employees"
              name="employeesCount"
              value={company.employeesCount}
              disabled={!editing}
              onChange={handleChange}
            />

            <div>
              <label className="font-semibold text-sm">About Company</label>
              <textarea
                name="about"
                disabled={!editing}
                value={company.about}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-200"
                rows={5}
              />
            </div>

            {editing && (
              <button
                onClick={saveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="font-semibold text-sm">{label}</label>
      <input
        {...rest}
        className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-200"
      />
    </div>
  );
}
