export default function DashboardCard({ icon, title, text, path, navigate, gradient }) {
  return (
    <div 
      onClick={() => navigate(path)}
      className="group relative cursor-pointer"
    >
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl h-[360px] flex flex-col justify-between">
        
        {/* Gradient Header */}
        <div className={`relative h-40 bg-gradient-to-br ${gradient} p-6 overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-green-700 transition-colors">
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {text}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-green-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
              Open →
            </span>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-10`} />
        </div>
      </div>
    </div>
  );
}
