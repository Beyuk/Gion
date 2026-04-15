import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    newMessageAlert: true,
    weeklyReport: true
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    console.log("Saved:", settings);
    alert("Notification preferences saved!");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Notification Preferences</h1>
        <p className="text-gray-500 text-sm mt-1">Configure how you receive notifications</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Email Notifications</h3>
            <p className="text-sm text-gray-500 mt-1">Receive updates via email</p>
          </div>
          <button
            onClick={() => toggleSetting("emailNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings.emailNotifications ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.emailNotifications ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">SMS Notifications</h3>
            <p className="text-sm text-gray-500 mt-1">Receive SMS alerts for appointments</p>
          </div>
          <button
            onClick={() => toggleSetting("smsNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings.smsNotifications ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.smsNotifications ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Appointment Reminders</h3>
            <p className="text-sm text-gray-500 mt-1">Send reminders before appointments</p>
          </div>
          <button
            onClick={() => toggleSetting("appointmentReminders")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings.appointmentReminders ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.appointmentReminders ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">New Message Alerts</h3>
            <p className="text-sm text-gray-500 mt-1">Get notified when new messages arrive</p>
          </div>
          <button
            onClick={() => toggleSetting("newMessageAlert")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings.newMessageAlert ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.newMessageAlert ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Weekly Report</h3>
            <p className="text-sm text-gray-500 mt-1">Receive weekly clinic performance report</p>
          </div>
          <button
            onClick={() => toggleSetting("weeklyReport")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings.weeklyReport ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.weeklyReport ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Save Preferences
        </button>
      </div>
    </div>
  );
}