import { Link } from "react-router-dom";

export default function Settings() {
  const settingsOptions = [
    { 
      title: "Security Settings", 
      icon: "🔒", 
      description: "Manage password and security preferences",
      path: "/admin/change-password",
    },
    { 
      title: "Clinic Information", 
      icon: "🏥", 
      description: "Update clinic details and contact info",
      path: "/admin/settings/clinic",
    },
    { 
      title: "Notification Preferences", 
      icon: "🔔", 
      description: "Configure email and system notifications",
      path: "/admin/settings/notifications",
    },
    { 
      title: "Business Hours", 
      icon: "⏰", 
      description: "Set clinic operating hours",
      path: "/admin/settings/hours",
    },
    { 
      title: "Invoice Settings", 
      icon: "💰", 
      description: "Manage payment and billing preferences",
      path: "/admin/settings/invoice",
    },
    { 
      title: "Staff Management", 
      icon: "👥", 
      description: "Add or remove staff members",
      path: "/admin/settings/staff",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your clinic preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {settingsOptions.map((option, idx) => (
          <Link
            key={idx}
            to={option.path}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              {option.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{option.title}</h3>
            <p className="text-sm text-gray-500">{option.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}