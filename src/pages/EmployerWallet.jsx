import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerWallet() {
  const transactions = [
    { id: 1, text: "Paid plumber", amount: -1200 },
    { id: 2, text: "Added money", amount: +3000 },
    { id: 3, text: "Paid electrician", amount: -950 }
  ];

  const balance =
    transactions.reduce((sum, t) => sum + t.amount, 0) + 5000;

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <SidebarEmployer />
      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Wallet
        </h1>

        <div className="bg-white border border-green-300 rounded-xl shadow p-6 mb-6">
          <p className="text-gray-500">Current Balance</p>
          <p className="text-4xl font-bold text-green-700">₹{balance}</p>
        </div>

        <h2 className="text-xl font-semibold text-green-700 mb-3">
          Recent Transactions
        </h2>

        <div className="bg-white border border-green-300 rounded-xl shadow p-6 space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="border-b pb-3">
              <p className="font-semibold">{t.text}</p>
              <p className="text-sm text-gray-500">
                {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
