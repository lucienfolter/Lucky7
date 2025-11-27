import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";

// Employee Pages
import DashBoard from "./pages/DashBoard";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeJobs from "./pages/EmployeeJobs";
import EmployeeMessages from "./pages/EmployeeMessages";
import EmployeeWallet from "./pages/EmployeeWallet";
import EmployeeSettings from "./pages/EmployeeSettings";
import EmployeeVerification from "./pages/EmployeeVerification";

// Employer Pages
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerJobs from "./pages/EmployerJobs";
import EmployerPostJob from "./pages/EmployerPostJob";
import EmployerMessages from "./pages/EmployerMessages";
import EmployerWallet from "./pages/EmployerWallet";
import EmployerSettings from "./pages/EmployerSettings";
import EmployerVerification from "./pages/EmployerVerification";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        
        {/* Employee Routes */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/employee-jobs" element={<EmployeeJobs />} />
        <Route path="/employee-messages" element={<EmployeeMessages />} />
        <Route path="/employee-wallet" element={<EmployeeWallet />} />
        <Route path="/employee-settings" element={<EmployeeSettings />} />
        <Route path="/employee-verification" element={<EmployeeVerification />} />
        
        {/* Employer Routes */}
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/profile" element={<EmployerProfile />} />
        <Route path="/employer-jobs" element={<EmployerJobs />} />
        <Route path="/employer-post-job" element={<EmployerPostJob />} />
        <Route path="/messages" element={<EmployerMessages />} />
        <Route path="/wallet" element={<EmployerWallet />} />
        <Route path="/settings" element={<EmployerSettings />} />
        <Route path="/employer-verification" element={<EmployerVerification />} />
      </Routes>
    </Router>
  );
}