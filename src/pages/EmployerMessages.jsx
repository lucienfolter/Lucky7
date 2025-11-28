import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerMessages() {
  const chats = [
    { id: 1, name: "Ramesh Kumar", message: "Can start tomorrow", time: "4:50 PM" },
    { id: 2, name: "Aman Gupta", message: "Thank you!", time: "1:10 PM" },
    { id: 3, name: "Vikas", message: "When should I come?", time: "Yesterday" }
  ];

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <SidebarEmployer />

      <main className="flex-1 p-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Messages
        </h1>

        <div className="bg-white border border-green-300 rounded-xl shadow p-4">
          {chats.map((c) => (
            <div
              key={c.id}
              className="border-b py-4 px-2 hover:bg-green-50 cursor-pointer"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-gray-500">{c.time}</p>
              </div>

              <p className="text-sm text-gray-600">{c.message}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
