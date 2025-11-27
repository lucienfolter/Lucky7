import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageToggle from "../Components/LanguageToggle";

export default function Login() {
  const { t } = useTranslation();

  const roles = [
    {
      title: t('login.employee'),
      text: t('login.employeeDesc'),
      path: "/login",   // Redirect to Login page instead of dashboard
      gradient: "from-green-400 via-green-500 to-green-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="80" height="80">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
        </svg>
      )
    },
    {
      title: t('login.employer'),
      text: t('login.employerDesc'),
      path: "/login",   // Also redirect to login page
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="80" height="80">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      )
    }
];


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                DailyWage
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('login.title')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('login.subtitle')}
            </p>

            {/* Features badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm font-semibold text-gray-700">Instant Job Matching</span>
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span className="text-sm font-semibold text-gray-700">Secure Payments</span>
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center gap-2">
                <span className="text-purple-600">✓</span>
                <span className="text-sm font-semibold text-gray-700">Verified Users</span>
              </div>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {roles.map((role, index) => (
              <Link
                key={index}
                to={role.path}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl">
                  {/* Gradient Header */}
                  <div className={`relative h-48 bg-gradient-to-br ${role.gradient} p-8 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        {role.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {role.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {role.text}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Get Started
                      </span>
                      <div className={`w-12 h-12 bg-gradient-to-br ${role.gradient} rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 space-y-4">
            <p className="text-gray-600">
              Trusted by <span className="font-bold text-green-600">10,000+</span> workers and employers
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}