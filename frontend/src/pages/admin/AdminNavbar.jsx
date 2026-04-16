import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminNavbar({ messages, formattedDate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 border-b sticky top-0 z-50">

      {/* LEFT */}
      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* MIDDLE (SEARCH) */}
      <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg bg-gray-100 outline-none text-sm"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Messages */}
        <Link
          to="/admin/contact"
          className="relative bg-gray-100 px-3 py-2 rounded-lg text-sm"
        >
          💬
          {messages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {messages}
            </span>
          )}
        </Link>

        {/* Notifications */}
        <div className="relative bg-gray-100 px-3 py-2 rounded-lg cursor-pointer">
          🔔
        </div>

        {/* Date */}
        <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-600">
          📅 {formattedDate}
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              A
            </div>
            <span className="text-sm text-gray-700">Admin</span>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/admin/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  localStorage.removeItem("adminData");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}