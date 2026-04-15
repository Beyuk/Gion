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
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const admin = JSON.parse(localStorage.getItem("adminData") || "{}");

  const getStatus = (status) => {
    if (status === "pending")
      return "bg-blue-50 text-blue-600";
    if (status === "cancelled")
      return "bg-gray-100 text-gray-500";
    if (status === "approved" || status === "confirmed")
      return "bg-green-50 text-green-600";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="space-y-10 bg-[#f8fbff] p-6 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {admin?.name || "Admin"} ✨
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border text-sm text-gray-400">
          {new Date().toDateString()}
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Appointments", value: appointments },
          { title: "Patients", value: users },
          { title: "Messages", value: messages },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-2xl font-semibold text-blue-600 mt-2">
              {loading ? "..." : item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-blue-50">
          <h3 className="text-sm text-gray-400 mb-4">
            Patients Growth (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-blue-50">
          <h3 className="text-sm text-gray-400 mb-4">
            Appointments (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="appointments" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-blue-50">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-gray-700 font-medium">
            Recent Appointments
          </h2>

          <Link
            to="/admin/appointments"
            className="text-blue-500 text-sm hover:underline"
          >
            View all
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-400 bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentAppointments.length > 0 ? (
              recentAppointments.map((apt, i) => (
                <tr key={i} className="border-t hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-gray-700">
                    {apt.full_name || apt.patientName || "Patient"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {apt.preferred_date ? new Date(apt.preferred_date).toLocaleDateString() : apt.date}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {apt.service || apt.message?.split('|')[0] || "Consultation"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatus(
                        apt.status
                      )}`}
                    >
                      {apt.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400">
                  No recent appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { to: "/admin/appointments", label: "New Appointment" },
          { to: "/admin/patients", label: "Add Patient" },
          { to: "/admin/contact", label: "Messages" },
          { to: "/admin/settings", label: "Settings" },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="bg-white border border-blue-50 p-5 rounded-xl text-center hover:bg-blue-50 transition"
          >
            <p className="text-sm text-gray-600">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}