import { useState } from "react";
import { useTranslation } from 'react-i18next';
import SidebarEmployer from "../Components/SidebarEmployer";
import ImageUploader from "../Components/ImageUploader";

export default function EmployerJobs() {
  const { t } = useTranslation();
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobImage, setJobImage] = useState(null);
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

  const handleImageUpload = (file, preview) => {
    setJobImage({ file, preview });
  };

  const handlePostJob = () => {
    console.log('Job Data:', jobData);
    console.log('Job Image:', jobImage);
    alert('Job posted successfully!');
    setShowPostJobModal(false);
    // Reset form
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
    setJobImage(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <header className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('jobs.title')}
          </header>
          <button
            onClick={() => setShowPostJobModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('jobs.postNewJob')}
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-600">Click "Post New Job" to get started!</p>
          </div>
        </div>
      </main>

      {/* Post Job Modal with Image Upload */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Post New Job
              </h2>
              <button
                onClick={() => setShowPostJobModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-5">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => setJobData({...jobData, title: e.target.value})}
                  placeholder="e.g., Plumber Needed for Kitchen Repair"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  value={jobData.category}
                  onChange={(e) => setJobData({...jobData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                >
                  <option value="">Select category</option>
                  <option value="plumbing">🔧 Plumbing</option>
                  <option value="electrical">⚡ Electrical</option>
                  <option value="carpentry">🪚 Carpentry</option>
                  <option value="painting">🎨 Painting</option>
                  <option value="cleaning">🧹 Cleaning</option>
                  <option value="gardening">🌱 Gardening</option>
                  <option value="ac_repair">❄️ AC Repair</option>
                  <option value="other">📦 Other</option>
                </select>
              </div>

              {/* Image Upload - NEW FEATURE */}
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/30">
                <ImageUploader
                  label="📸 Job Image (Optional - Show the problem)"
                  onImageUpload={handleImageUpload}
                  existingImage={jobImage?.preview}
                  maxSize={5}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  💡 Upload a photo of the problem area to help workers understand the job better
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={jobData.description}
                  onChange={(e) => setJobData({...jobData, description: e.target.value})}
                  rows="4"
                  placeholder="Describe the work that needs to be done in detail... Include any specific requirements or tools needed."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Rate and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hourly Rate <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={jobData.rate}
                      onChange={(e) => setJobData({...jobData, rate: e.target.value})}
                      placeholder="500"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobData.duration}
                    onChange={(e) => setJobData({...jobData, duration: e.target.value})}
                    placeholder="e.g., 2-3 hours"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobData.location}
                  onChange={(e) => setJobData({...jobData, location: e.target.value})}
                  placeholder="Enter detailed location (Area, Landmark, City)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={jobData.date}
                  onChange={(e) => setJobData({...jobData, date: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Urgent Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <input 
                  type="checkbox" 
                  id="urgent" 
                  checked={jobData.urgent}
                  onChange={(e) => setJobData({...jobData, urgent: e.target.checked})}
                  className="w-5 h-5 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-400" 
                />
                <label htmlFor="urgent" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  ⚡ Mark as urgent (your job will appear at the top with a red badge)
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowPostJobModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePostJob}
                disabled={!jobData.title || !jobData.category || !jobData.description}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🚀 Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}