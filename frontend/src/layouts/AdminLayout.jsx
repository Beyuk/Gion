// AdminLayout.jsx - Profile in TOP RIGHT corner like the image
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: 1, label: "Dashboard", path: "/admin", icon: "📊" },
  { id: 2, label: "Appointments", path: "/admin/appointments", icon: "📅" },
  { id: 3, label: "Services", path: "/admin/services", icon: "⚙️" },
  { id: 4, label: "Patients", path: "/admin/patients", icon: "👥" },
  { id: 5, label: "Contact Messages", path: "/admin/contact", icon: "💬" },
  { id: 6, label: "Settings", path: "/admin/settings", icon: "🔧" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const adminDataStr = localStorage.getItem("adminData");
  const adminData = adminDataStr ? JSON.parse(adminDataStr) : null;
  const adminName = adminData?.name || "Daniel Shukare";
  const adminRole = "Super Admin";
  const adminEmail = adminData?.email || "daniel@giordental.com";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-blue-800/30">
        <h2 className="text-2xl font-bold text-white">Gion</h2>
        <p className="text-sm text-blue-200 mt-1">Specialty Dental Clinic</p>
      </div>

      <div className="flex-1 px-3 py-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-300 hover:bg-blue-800/40 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Sidebar bottom - only logout button */}
      <div className="p-4 border-t border-blue-800/30">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white shadow-xl">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="text-white text-3xl">×</button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Profile in TOP RIGHT corner like image */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 md:px-8">
          {/* Left side - Logo / Title */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700 text-2xl"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          {/* Right side - Search + Profile (like image) */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search here..."
                className="w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>

            {/* Profile in TOP RIGHT - Avatar + Name + Role (like image) */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-semibold shadow-sm">
                  {adminName.charAt(0).toUpperCase()}
                </div>
                {/* Name and Role */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">{adminName}</p>
                  <p className="text-xs text-gray-500">{adminRole}</p>
                </div>
                {/* Dropdown arrow */}
                <svg className={`hidden md:block w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                        {adminName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                        <p className="text-xs text-gray-500">{adminRole}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{adminEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 bg-[#f8fbff]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}