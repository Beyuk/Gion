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
  const adminName = adminData?.name || "Admin";
  const adminEmail = adminData?.email || "";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-blue-800/30">
        <h2 className="text-2xl font-bold text-white">Gion Admin</h2>
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

      <div className="p-6 border-t border-blue-800/30">
        <div className="mb-4 pb-4 border-b border-blue-800/30">
          <p className="text-xs text-blue-300/70 mb-1">Logged in as</p>
          <p className="text-sm font-medium text-white">{adminName}</p>
          <p className="text-xs text-blue-300/70 mt-1 truncate">{adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white shadow-xl">
        <SidebarContent />
      </div>

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

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8">
          <button className="md:hidden text-gray-700 text-2xl mr-4" onClick={() => setMobileOpen(true)}>☰</button>
          <h1 className="text-xl font-semibold text-gray-800 md:hidden">Gion Admin</h1>
          
          <div className="relative ml-auto">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 hidden md:block">{adminName}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{adminName}</p>
                    <p className="text-xs text-gray-500 truncate">{adminEmail}</p>
                  </div>
                  <Link to="/admin/change-password" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-10V6a4 4 0 00-8 0v3h8z" />
                    </svg>
                    Change Password
                  </Link>
                  <button onClick={() => { setShowProfileMenu(false); handleLogout(); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}