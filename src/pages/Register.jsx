import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        phone,
        password,
        role,
      });

      navigate("/login");  // <--- REDIRECT AFTER SUCCESS
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <input type="text" placeholder="Full Name" className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={fullName} onChange={(e) => setFullName(e.target.value)} required />

        <input type="email" placeholder="Email" className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="text" placeholder="Phone" className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <input type="password" placeholder="Password" className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <select className="w-full mb-6 px-4 py-3 border rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
          Register
        </button>

        <p className="text-center mt-4 text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
}
