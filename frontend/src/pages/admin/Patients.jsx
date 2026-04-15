import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Search, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight,
  User, Phone, Mail, Calendar, Activity, FileText, AlertCircle
} from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    occupation: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    medical_history: "",
    allergies: "",
    dental_history: "",
    notes: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Define BASE_URL once at the top
  const BASE_URL = "http://localhost:5000/api";

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/patients?search=${search}&status=${status}&page=${page}`
      );
      setPatients(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/patients/stats/summary`);
      setStats(response.data.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchStats();
  }, [search, status, page]);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // ✅ FIXED: Added http://
        await axios.put(`${BASE_URL}/admin/patients/${selectedPatient.id}`, formData);
        alert("Patient updated successfully!");
      } else {
        // ✅ FIXED: Added http://
        await axios.post(`${BASE_URL}/admin/patients`, formData);
        alert("Patient added successfully!");
      }
      setShowModal(false);
      resetForm();
      fetchPatients();
      fetchStats();
    } catch (err) {
      console.error("Error saving patient:", err);
      alert("Failed to save patient: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeletePatient = async () => {
    try {
      // ✅ Already correct
      await axios.delete(`${BASE_URL}/admin/patients/${selectedPatient.id}`);
      alert("Patient deleted successfully!");
      setShowDeleteModal(false);
      fetchPatients();
      fetchStats();
    } catch (err) {
      console.error("Error deleting patient:", err);
      alert("Failed to delete patient: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      full_name: patient.full_name || "",
      email: patient.email || "",
      phone: patient.phone || "",
      date_of_birth: patient.date_of_birth ? patient.date_of_birth.split('T')[0] : "",
      gender: patient.gender || "",
      address: patient.address || "",
      occupation: patient.occupation || "",
      emergency_contact_name: patient.emergency_contact_name || "",
      emergency_contact_phone: patient.emergency_contact_phone || "",
      medical_history: patient.medical_history || "",
      allergies: patient.allergies || "",
      dental_history: patient.dental_history || "",
      notes: patient.notes || ""
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleViewPatient = async (patient) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/patients/${patient.id}`);
      setSelectedPatient(response.data.data);
      setShowViewModal(true);
    } catch (err) {
      console.error("Error fetching patient details:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      address: "",
      occupation: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      medical_history: "",
      allergies: "",
      dental_history: "",
      notes: ""
    });
    setIsEditing(false);
    setSelectedPatient(null);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Follow-up Needed': 'bg-yellow-100 text-yellow-800',
      'New': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading && patients.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading patients...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all registered patients and their records</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Patient
        </button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">Total Patients</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total_patients}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active_patients}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">New (30 days)</p>
            <p className="text-2xl font-bold text-blue-600">{stats.new_patients_month}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">Follow-up Needed</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.followup_needed || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">Appointments This Month</p>
            <p className="text-2xl font-bold text-purple-600">{stats.appointments_this_month}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-xs">Upcoming Appointments</p>
            <p className="text-2xl font-bold text-orange-600">{stats.upcoming_appointments || 0}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="New">New</option>
              <option value="Follow-up Needed">Follow-up Needed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{patient.full_name}</p>
                        {patient.date_of_birth && (
                          <p className="text-xs text-gray-500">
                            <Calendar size={12} className="inline mr-1" />
                            {new Date(patient.date_of_birth).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <Phone size={14} /> {patient.phone}
                    </p>
                    {patient.email && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Mail size={14} /> {patient.email}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {patient.medical_history && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FileText size={12} />
                        <span className="truncate max-w-[150px]">{patient.medical_history.substring(0, 30)}</span>
                      </div>
                    )}
                    {patient.allergies && (
                      <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle size={12} />
                        <span className="truncate max-w-[150px]">{patient.allergies.substring(0, 30)}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(patient.status)}`}>
                      {patient.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(patient.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-gray-600 hover:text-blue-600"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold">{isEditing ? "Edit Patient" : "Add New Patient"}</h2>
            </div>
            <form onSubmit={handleAddPatient} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                <textarea
                  value={formData.medical_history}
                  onChange={(e) => setFormData({...formData, medical_history: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Previous dental treatments, surgeries, chronic conditions, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Any allergies to medications, latex, etc."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Add"} Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Patient Modal */}
      {showViewModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Patient Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
                  <p><strong>Name:</strong> {selectedPatient.full_name}</p>
                  <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                  <p><strong>Email:</strong> {selectedPatient.email || 'N/A'}</p>
                  <p><strong>Date of Birth:</strong> {selectedPatient.date_of_birth ? new Date(selectedPatient.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedPatient.address || 'N/A'}</p>
                  <p><strong>Occupation:</strong> {selectedPatient.occupation || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Emergency Contact</h3>
                  <p><strong>Name:</strong> {selectedPatient.emergency_contact_name || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedPatient.emergency_contact_phone || 'N/A'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Medical History</h3>
                <p className="bg-gray-50 p-3 rounded">{selectedPatient.medical_history || 'No medical history recorded'}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Allergies</h3>
                <p className="bg-gray-50 p-3 rounded">{selectedPatient.allergies || 'No allergies recorded'}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Dental History</h3>
                <p className="bg-gray-50 p-3 rounded">{selectedPatient.dental_history || 'No dental history recorded'}</p>
              </div>
              
              {selectedPatient.appointments && selectedPatient.appointments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Appointment History</h3>
                  <div className="space-y-2">
                    {selectedPatient.appointments.map((apt) => (
                      <div key={apt.id} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                        <div>
                          <p className="font-medium">{new Date(apt.preferred_date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{apt.message}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedPatient.full_name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePatient}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}