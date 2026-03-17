import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: 1, label: "Dashboard", path: "/admin" },
  { id: 2, label: "Appointments", path: "/admin/appointments" },
  { id: 3, label: "Services", path: "/admin/services" },
  { id: 4, label: "Patients / Users", path: "/admin/users" },
  { id: 5, label: "Contact Messages", path: "/admin/contact" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Updated logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login"); // React Router navigation
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Gion Admin</h2>
        <p className="text-sm text-gray-400 mt-1">Specialty Dental Clinic</p>
      </div>

      <div className="flex-1 px-3 py-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-4 py-3 mb-1 rounded-lg text-white transition-colors ${
                isActive
                  ? "bg-blue-600 text-white font-medium"
                  : "hover:bg-gray-700"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-3">Logged in as Admin</p>
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-72 bg-gray-900 text-white border-r border-gray-800">
        <SidebarContent />
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 bg-gray-900 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white text-3xl"
              >
                ×
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-8">
          <button
            className="md:hidden text-gray-700 text-2xl mr-4"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-gray-800 md:hidden">
            Gion Admin
          </h1>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}