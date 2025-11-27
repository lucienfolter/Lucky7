import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Redirect based on role
      if (res.data.user.role === "employee") {
        navigate("/dashboard");
      } else if (res.data.user.role === "employer") {
        navigate("/employer-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          No account? <Link to="/register" className="text-blue-600 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}
