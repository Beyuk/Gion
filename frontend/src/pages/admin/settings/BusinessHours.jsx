import { useState } from "react";

export default function BusinessHours() {
  const [hours, setHours] = useState({
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "10:00", close: "14:00", closed: false },
    sunday: { open: "00:00", close: "00:00", closed: true }
  });

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" }
  ];

  const updateHours = (day, field, value) => {
    setHours({
      ...hours,
      [day]: { ...hours[day], [field]: value }
    });
  };

  const handleSave = () => {
    console.log("Saved hours:", hours);
    alert("Business hours saved!");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Business Hours</h1>
        <p className="text-gray-500 text-sm mt-1">Set your clinic operating hours</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="divide-y divide-gray-100">
          {days.map((day) => (
            <div key={day.key} className="p-5">
              <div className="flex items-center justify-between">
                <div className="w-28">
                  <h3 className="font-medium text-gray-800">{day.label}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours[day.key].closed}
                      onChange={(e) => updateHours(day.key, "closed", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Closed</span>
                  </label>
                  
                  {!hours[day.key].closed && (
                    <>
                      <input
                        type="time"
                        value={hours[day.key].open}
                        onChange={(e) => updateHours(day.key, "open", e.target.value)}
                        className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="time"
                        value={hours[day.key].close}
                        onChange={(e) => updateHours(day.key, "close", e.target.value)}
                        className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Save Hours
        </button>
      </div>
    </div>
  );
}