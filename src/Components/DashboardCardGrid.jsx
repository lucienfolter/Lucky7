import DashboardCard from "./DashboardCard";

export default function DashboardCardGrid({ cards, navigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl animate-fade-in">
      {cards.map((card, i) => (
        <div 
          key={i}
          style={{ animationDelay: `${i * 100}ms` }}
          className="animate-fade-in"
        >
          <DashboardCard {...card} navigate={navigate} />
        </div>
      ))}
    </div>
  );
}