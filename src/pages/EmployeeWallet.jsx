import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar from "../Components/Sidebar";

export default function EmployeeWallet() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([
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
  ]);

  const [newBankData, setNewBankData] = useState({
    bankName: '',
    accountNumber: '',
    ifsc: '',
    accountHolderName: ''
  });

  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Payment from Ramesh Kumar",
      amount: "₹1,800",
      date: "Nov 14, 2025",
      status: "Completed",
      job: "Kitchen Plumbing Repair"
    },
    {
      id: 2,
      type: "credit",
      description: "Payment from Priya Sharma",
      amount: "₹2,500",
      date: "Nov 12, 2025",
      status: "Completed",
      job: "Electrical Wiring Work"
    },
    {
      id: 3,
      type: "debit",
      description: "Withdrawal to Bank Account",
      amount: "₹3,000",
      date: "Nov 10, 2025",
      status: "Processing",
      job: null
    },
    {
      id: 4,
      type: "credit",
      description: "Payment from Amit Patel",
      amount: "₹2,200",
      date: "Nov 8, 2025",
      status: "Completed",
      job: "Furniture Assembly"
    },
    {
      id: 5,
      type: "debit",
      description: "Platform Fee",
      amount: "₹150",
      date: "Nov 7, 2025",
      status: "Completed",
      job: null
    }
  ];

  const handleAddBank = () => {
    if (!newBankData.bankName || !newBankData.accountNumber || !newBankData.ifsc || !newBankData.accountHolderName) {
      alert('❌ Please fill all fields!');
      return;
    }

    const newAccount = {
      id: bankAccounts.length + 1,
      bankName: newBankData.bankName,
      accountNumber: `****${newBankData.accountNumber.slice(-4)}`,
      ifsc: newBankData.ifsc,
      primary: bankAccounts.length === 0
    };

    setBankAccounts([...bankAccounts, newAccount]);
    setNewBankData({
      bankName: '',
      accountNumber: '',
      ifsc: '',
      accountHolderName: ''
    });
    setShowAddBankModal(false);
    alert('✅ Bank account added successfully!');
  };

  const handleDeleteBank = (id) => {
    if (window.confirm('Are you sure you want to delete this bank account?')) {
      setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
      alert('✅ Bank account deleted!');
    }
  };

  const handleSetPrimary = (id) => {
    setBankAccounts(bankAccounts.map(acc => ({
      ...acc,
      primary: acc.id === id
    })));
    alert('✅ Primary account updated!');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          MY WALLET
        </header>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all">
            <p className="text-sm opacity-90 mb-2">💰 Available Balance</p>
            <p className="text-4xl font-bold mb-4">₹8,450</p>
            <button className="bg-white text-green-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all font-semibold text-sm shadow-lg">
              💸 Withdraw Funds
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200 hover:shadow-2xl transition-all">
            <p className="text-sm text-gray-600 mb-2">📊 Earnings This Month</p>
            <p className="text-3xl font-bold text-green-700 mb-2">₹12,500</p>
            <p className="text-sm text-green-600">📈 +15% from last month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 hover:shadow-2xl transition-all">
            <p className="text-sm text-gray-600 mb-2">⏳ Pending Payments</p>
            <p className="text-3xl font-bold text-yellow-600 mb-2">₹3,000</p>
            <p className="text-sm text-gray-500">2 payments processing</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400"
            }`}
          >
            💳 Transaction History
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "bank"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400"
            }`}
          >
            🏦 Bank Accounts
          </button>
        </div>

        {/* Transaction History Tab */}
        {activeTab === "overview" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50 border-b-2 border-green-200">
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
                      className={`border-b border-gray-200 hover:bg-green-50 transition-all ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            {transaction.type === "credit" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="20" height="20">
                                <path d="M7 14l5-5 5 5z"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="20" height="20">
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
                      <td className={`px-6 py-4 text-sm font-bold ${
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
                          {transaction.status === "Completed" && "✅ "}
                          {transaction.status === "Processing" && "⏳ "}
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

        {/* Bank Accounts Tab */}
        {activeTab === "bank" && (
          <div className="space-y-4">
            {bankAccounts.map(account => (
              <div
                key={account.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" width="28" height="28">
                        <path d="M21 5H3c-1.1 0-2 .9-2 2v11a3 3 0 003 3h16a3 3 0 003-3V7c0-1.1-.9-2-2-2zM3 18V7h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{account.bankName}</h3>
                        {account.primary && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            ⭐ Primary
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
                    {!account.primary && (
                      <button 
                        onClick={() => handleSetPrimary(account.id)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
                        title="Set as Primary"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteBank(account.id)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Bank Account Button */}
            <button 
              onClick={() => setShowAddBankModal(true)}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl p-6 hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <div className="flex items-center justify-center gap-3 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-semibold">Add New Bank Account</span>
              </div>
            </button>
          </div>
        )}

        {/* Add Bank Account Modal */}
        {showAddBankModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Bank Account</h2>
                <button
                  onClick={() => setShowAddBankModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name *</label>
                  <input
                    type="text"
                    value={newBankData.accountHolderName}
                    onChange={(e) => setNewBankData({...newBankData, accountHolderName: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                  <select
                    value={newBankData.bankName}
                    onChange={(e) => setNewBankData({...newBankData, bankName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  >
                    <option value="">Select Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Canara Bank">Canara Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                  <input
                    type="text"
                    value={newBankData.accountNumber}
                    onChange={(e) => setNewBankData({...newBankData, accountNumber: e.target.value})}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code *</label>
                  <input
                    type="text"
                    value={newBankData.ifsc}
                    onChange={(e) => setNewBankData({...newBankData, ifsc: e.target.value.toUpperCase()})}
                    placeholder="e.g., SBIN0001234"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowAddBankModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBank}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}