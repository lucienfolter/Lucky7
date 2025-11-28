import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import SidebarEmployer from "../Components/SidebarEmployer";
import axios from "axios";

export default function EmployerJobs() {
  const { t } = useTranslation();
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    'Plumbing',
    'Electrical', 
    'Carpentry',
    'House Cleaning',
    'Appliance Repair',
    'Painting',
    'Others'
  ];

  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    description: '',
    rate: '',
    duration: '',
    location: '',
    date: '',
    urgent: false
  });

  const token = localStorage.getItem('token');

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostJob = async () => {
    try {
      const formData = new FormData();
      formData.append('title', jobData.title);
      formData.append('category', jobData.category);
      formData.append('description', jobData.description);
      formData.append('rate', jobData.rate);
      formData.append('duration', jobData.duration);
      formData.append('location', jobData.location);
      formData.append('date', jobData.date);
      formData.append('urgent', jobData.urgent);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post("http://localhost:5000/api/jobs", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Job posted successfully!");
      setJobs([response.data.job, ...jobs]);
      setShowPostJobModal(false);
      resetForm();
    } catch (error) {
      alert("Failed to post job");
      console.error(error);
    }
  };

  const resetForm = () => {
    setJobData({
      title: '',
      category: '',
      description: '',
      rate: '',
      duration: '',
      location: '',
      date: '',
      urgent: false
    });
    setImagePreview(null);
    setImageFile(null);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      alert("Failed to delete job");
      console.error(error);
    }
  };

  const viewApplications = (job) => {
    setSelectedJob(job);
    setShowApplicationsModal(true);
  };

  const updateApplicationStatus = async (jobId, applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${jobId}/applications/${applicationId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`Application ${status}!`);
      fetchJobs(); // Refresh jobs
      
      // Update selected job
      const updatedJob = jobs.find(j => j._id === jobId);
      if (updatedJob) {
        setSelectedJob(updatedJob);
      }
    } catch (error) {
      alert("Failed to update application");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700">Manage Jobs</h1>
          <button
            onClick={() => setShowPostJobModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold shadow flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </button>
        </div>

        {/* Job List */}
        {jobs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200 text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-600">Click "Post New Job" to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
                {job.image?.url && (
                  <img 
                    src={`http://localhost:5000${job.image.url}`}
                    alt={job.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                  {job.urgent && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                      URGENT
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-2">{job.description}</p>
                
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p><strong>Category:</strong> {job.category}</p>
                  <p><strong>Rate:</strong> ₹{job.rate}</p>
                  <p><strong>Duration:</strong> {job.duration}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Date:</strong> {job.date}</p>
                  <p><strong>Applications:</strong> {job.applications?.length || 0}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => viewApplications(job)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    View Applications ({job.applications?.length || 0})
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Post a New Job</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Job Title *" name="title" value={jobData.title} onChange={handleChange} />
              
              <div>
                <label className="block mb-1 font-semibold">Category *</label>
                <select
                  name="category"
                  value={jobData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <Input label="Daily Rate (₹) *" name="rate" value={jobData.rate} onChange={handleChange} />
              <Input label="Duration" name="duration" value={jobData.duration} onChange={handleChange} />
              <Input label="Location *" name="location" value={jobData.location} onChange={handleChange} />
              <Input label="Date" type="date" name="date" value={jobData.date} onChange={handleChange} />

              <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">Job Description *</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Describe the work..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">Job Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />
                )}
              </div>

              <div className="flex items-center gap-2 md:col-span-2">
                <input 
                  type="checkbox" 
                  checked={jobData.urgent} 
                  onChange={(e) => setJobData({...jobData, urgent: e.target.checked})} 
                />
                <span className="font-semibold">Mark as Urgent</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowPostJobModal(false);
                  resetForm();
                }}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePostJob}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-700">Applications for: {selectedJob.title}</h2>
                <p className="text-gray-600">Total: {selectedJob.applications?.length || 0} applications</p>
              </div>
              <button
                onClick={() => setShowApplicationsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedJob.applications?.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {selectedJob.applications.map((app) => (
                  <div key={app._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{app.employee?.fullName || 'Unknown'}</h3>
                        <p className="text-sm text-gray-600">{app.employee?.email}</p>
                        <p className="text-sm text-gray-600">{app.employee?.phone}</p>
                        {app.employee?.skills && (
                          <p className="text-sm text-gray-600"><strong>Skills:</strong> {app.employee.skills}</p>
                        )}
                        {app.employee?.experience && (
                          <p className="text-sm text-gray-600"><strong>Experience:</strong> {app.employee.experience}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    {app.message && (
                      <p className="text-sm text-gray-700 mb-3 italic">"{app.message}"</p>
                    )}

                    <p className="text-xs text-gray-500 mb-3">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </p>

                    {app.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateApplicationStatus(selectedJob._id, app._id, 'accepted')}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(selectedJob._id, app._id, 'rejected')}
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input {...rest} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}