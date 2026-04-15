import { useState } from "react";

export default function StaffManagement() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Sarah Johnson", role: "Dentist", email: "sarah@clinic.com", status: "Active" },
    { id: 2, name: "Dr. Michael Chen", role: "Orthodontist", email: "michael@clinic.com", status: "Active" },
    { id: 3, name: "Lisa Williams", role: "Nurse", email: "lisa@clinic.com", status: "Active" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", email: "" });

  const addStaff = () => {
    if (newStaff.name && newStaff.role) {
      setStaff([...staff, { ...newStaff, id: Date.now(), status: "Active" }]);
      setNewStaff({ name: "", role: "", email: "" });
      setShowForm(false);
      alert("Staff member added!");
    }
  };

  const removeStaff = (id) => {
    setStaff(staff.filter(member => member.id !== id));
    alert("Staff member removed");
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Staff Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add or remove staff members</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-800 mb-4">Add New Staff Member</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role"
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button onClick={addStaff} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>
              <button onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => removeStaff(member.id)} className="text-red-500 hover:text-red-700 text-sm">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}