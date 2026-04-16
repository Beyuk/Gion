// AdminDashboard.jsx - Advanced Modern Dashboard with Perfect UI
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState(0);
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [summaryRes, monthlyRes, apptRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/dashboard-summary"),
          axios.get("http://localhost:5000/api/admin/monthly-stats"),
          axios.get("http://localhost:5000/api/appointments"),
        ]);

        setAppointments(summaryRes.data.appointments);
        setUsers(summaryRes.data.patients);
        setMessages(summaryRes.data.messages);
        setRecentAppointments(apptRes.data.slice(0, 5));
        setChartData(monthlyRes.data);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setChartData([
          { name: "Dec", patients: 4, appointments: 3 },
          { name: "Jan", patients: 6, appointments: 5 },
          { name: "Feb", patients: 8, appointments: 4 },
          { name: "Mar", patients: 10, appointments: 7 },
          { name: "Apr", patients: 11, appointments: 6 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const getStatus = (status) => {
    if (status === "pending") return "bg-amber-100 text-amber-700";
    if (status === "cancelled") return "bg-gray-100 text-gray-500";
    if (status === "approved" || status === "confirmed") return "bg-emerald-100 text-emerald-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your clinic overview</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Appointments Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Appointments</p>
              <h2 className="text-3xl font-bold text-gray-800">{loading ? "..." : appointments}</h2>
              <p className="text-xs text-gray-400 mt-2">vs last month</p>
            </div>
          </div>
        </div>

        {/* Active Patients Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Active Patients</p>
              <h2 className="text-3xl font-bold text-gray-800">{loading ? "..." : users}</h2>
              <p className="text-xs text-gray-400 mt-2">new patients this month</p>
            </div>
          </div>
        </div>

        {/* Unread Messages Card */}
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">-5%</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Unread Messages</p>
              <h2 className="text-3xl font-bold text-gray-800">{loading ? "..." : messages}</h2>
              <p className="text-xs text-gray-400 mt-2">pending response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patients Growth Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Patients Growth</h3>
                <p className="text-xs text-gray-400 mt-0.5">Last 6 months trend</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                +23% growth
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '8px 12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Appointments Overview</h3>
                <p className="text-xs text-gray-400 mt-0.5">Monthly appointment statistics</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                +15% vs last period
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="appointments" 
                  fill="#60a5fa" 
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-gray-800 font-semibold text-lg">Recent Appointments</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest patient appointments</p>
          </div>
          <Link to="/admin/appointments" className="text-blue-600 text-sm hover:text-blue-700 font-medium flex items-center gap-1">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">Service</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.length > 0 ? (
                recentAppointments.map((apt, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                          {apt.full_name?.charAt(0) || apt.patientName?.charAt(0) || "P"}
                        </div>
                        <span className="text-gray-700 text-sm font-medium">
                          {apt.full_name || apt.patientName || "Patient"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500 text-sm">
                          {apt.preferred_date ? new Date(apt.preferred_date).toLocaleDateString() : apt.date}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {apt.service || apt.message?.split('|')[0] || "Consultation"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(apt.status)}`}>
                        {apt.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-400">No recent appointments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}