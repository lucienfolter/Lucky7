import { useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("overview");

  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Payment from Ramesh Kumar",
      amount: "₹1,800",
      date: "Nov 4, 2025",
      status: "Completed",
      job: "Kitchen Plumbing Repair"
    },
    {
      id: 2,
      type: "credit",
      description: "Payment from Priya Sharma",
      amount: "₹2,500",
      date: "Nov 2, 2025",
      status: "Completed",
      job: "Electrical Wiring Work"
    },
    {
      id: 3,
      type: "debit",
      description: "Withdrawal to Bank Account",
      amount: "₹3,000",
      date: "Nov 1, 2025",
      status: "Processing",
      job: null
    },
    {
      id: 4,
      type: "credit",
      description: "Payment from Amit Patel",
      amount: "₹2,200",
      date: "Oct 30, 2025",
      status: "Completed",
      job: "Furniture Assembly"
    },
    {
      id: 5,
      type: "debit",
      description: "Platform Fee",
      amount: "₹150",
      date: "Oct 30, 2025",
      status: "Completed",
      job: null
    }
  ];

  const bankAccounts = [
    {
      id: 1,
      bankName: "State Bank of India",
      accountNumber: "****7890",
      ifsc: "SBIN0001234",
      primary: true
    },
    {
      id: 2,
      bankName: "HDFC Bank",
      accountNumber: "****4567",
      ifsc: "HDFC0001234",
      primary: false
    }
  ];

  return (
    <div className="flex min-h-screen w-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold text-green-700 mb-8">
          WALLET
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <p className="text-4xl font-bold mb-4">₹8,450</p>
            <button className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm">
              Withdraw Funds
            </button>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Earnings This Month</p>
            <p className="text-3xl font-bold text-green-700 mb-2">₹12,500</p>
            <p className="text-sm text-green-600">↑ 15% from last month</p>
          </div>

          <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Pending Payments</p>
            <p className="text-3xl font-bold text-yellow-600 mb-2">₹3,000</p>
            <p className="text-sm text-gray-500">2 payments processing</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-400"
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "bank"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-green-400"
            }`}
          >
            Bank Accounts
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="bg-white border border-green-300 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50 border-b border-green-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Job</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            {transaction.type === "credit" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="16" height="16">
                                <path d="M7 14l5-5 5 5z"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="16" height="16">
                                <path d="M7 10l5 5 5-5z"/>
                              </svg>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transaction.job || "-"}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${
                        transaction.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "credit" ? "+" : "-"} {transaction.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "bank" && (
          <div className="space-y-4">
            {bankAccounts.map(account => (
              <div
                key={account.id}
                className="bg-white border border-green-300 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M21 5H3c-1.1 0-2 .9-2 2v11a3 3 0 003 3h16a3 3 0 003-3V7c0-1.1-.9-2-2-2zM3 18V7h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{account.bankName}</h3>
                        {account.primary && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Account: {account.accountNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        IFSC: {account.ifsc}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-green-600 hover:text-green-700 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-700 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full bg-white border-2 border-dashed border-green-300 rounded-2xl p-6 hover:border-green-500 hover:bg-green-50 transition-all">
              <div className="flex items-center justify-center gap-3 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-semibold">Add New Bank Account</span>
              </div>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}