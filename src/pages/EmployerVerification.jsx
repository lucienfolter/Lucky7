import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SidebarEmployer from '../Components/SidebarEmployer';
import Webcam from 'react-webcam';

export default function EmployerVerification() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [documentType, setDocumentType] = useState('');
  const [documentImage, setDocumentImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  
  const webcamRef = useRef(null);
  const documentInputRef = useRef(null);

  const documentTypes = [
    { value: 'aadhaar', label: 'Aadhaar Card', icon: '🪪' },
    { value: 'pan', label: 'PAN Card', icon: '💳' },
    { value: 'gst', label: 'GST Certificate', icon: '📄' },
    { value: 'driving_license', label: 'Driving License', icon: '🚗' },
    { value: 'company_registration', label: 'Company Registration', icon: '🏢' },
    { value: 'voter_id', label: 'Voter ID', icon: '🗳️' }
  ];

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfieImage(imageSrc);
    setShowWebcam(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SidebarEmployer />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              EMPLOYER VERIFICATION
            </h1>
            <p className="text-gray-600">Complete your business verification to post jobs and hire workers</p>
          </header>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= num 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > num ? '✓' : num}
                  </div>
                  {num < 3 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      step > num ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-gray-600">
              <span>Select ID</span>
              <span>Upload ID</span>
              <span>Take Selfie</span>
            </div>
          </div>

          {/* Step 1: Select Document Type */}
          {step === 1 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Business/ID Proof Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((doc) => (
                  <button
                    key={doc.value}
                    onClick={() => {
                      setDocumentType(doc.value);
                      setStep(2);
                    }}
                    className="group relative p-6 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{doc.icon}</span>
                      <div className="text-left">
                        <p className="font-bold text-gray-800 group-hover:text-blue-700">
                          {doc.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {doc.value === 'gst' || doc.value === 'company_registration' 
                            ? 'Business document' 
                            : 'Government issued ID'}
                        </p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Upload Document */}
          {step === 2 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Upload Your {documentTypes.find(d => d.value === documentType)?.label}
              </h2>

              {!documentImage ? (
                <div
                  onClick={() => documentInputRef.current?.click()}
                  className="group cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-10 h-10 text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700">Click to upload document</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Clear photo of your {documentType === 'gst' || documentType === 'company_registration' ? 'business document' : 'ID card'} • PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border-2 border-blue-300">
                  <img src={documentImage} alt="Document" className="w-full" />
                  <button
                    onClick={() => setDocumentImage(null)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Change
                  </button>
                </div>
              )}

              <input
                ref={documentInputRef}
                type="file"
                accept="image/*"
                onChange={handleDocumentUpload}
                className="hidden"
              />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!documentImage}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Take Selfie */}
          {step === 3 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Take a Live Selfie</h2>
              <p className="text-gray-600 mb-6">
                Please take a clear selfie for identity verification. Ensure good lighting and look directly at the camera.
              </p>

              {!selfieImage ? (
                !showWebcam ? (
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-16 h-16 text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <button
                      onClick={() => setShowWebcam(true)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg text-lg"
                    >
                      📸 Open Camera
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border-4 border-blue-300">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full"
                        videoConstraints={{
                          facingMode: 'user',
                          width: 1280,
                          height: 720
                        }}
                      />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-4 border-white rounded-full opacity-50" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowWebcam(false)}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={captureSelfie}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg"
                      >
                        📸 Capture
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border-4 border-blue-300">
                    <img src={selfieImage} alt="Selfie" className="w-full" />
                  </div>
                  <button
                    onClick={() => {
                      setSelfieImage(null);
                      setShowWebcam(true);
                    }}
                    className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                  >
                    Retake Selfie
                  </button>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    alert('✅ Verification submitted successfully! We will review your documents and notify you within 24-48 hours.');
                    // You can redirect to dashboard here
                    // window.location.href = '/employer-dashboard';
                  }}
                  disabled={!selfieImage}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
                >
                  Submit for Verification
                </button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-blue-800 mb-2">Why do we need verification?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✓ Ensures safety and trust in our platform</li>
                  <li>✓ Prevents fraud and protects workers</li>
                  <li>✓ Builds credibility for your business</li>
                  <li>✓ Unlocks all platform features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}