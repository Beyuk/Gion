// AdminAppointments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Get token from localStorage if you're using authentication
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      console.log('Raw API response:', response.data);
      
      // Handle the response based on your API structure
      const appointmentsData = response.data.data || response.data;
      setAppointments(appointmentsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      await axios.put(`http://localhost:5000/api/appointments/${id}`, 
        { status: newStatus },
        { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }
      );
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === id ? { ...apt, status: newStatus } : apt
        )
      );
      
      alert(`Appointment ${newStatus} successfully!`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update appointment status');
    }
  };

  const extractServiceFromMessage = (message) => {
    if (!message) return 'General Checkup';
    // Handle both formats: "Service at Time" and "Service | Time: Time"
    if (message.includes(' at ')) {
      return message.split(' at ')[0];
    } else if (message.includes(' | Time: ')) {
      return message.split(' | Time: ')[0];
    }
    return message;
  };

  const extractTimeFromMessage = (message) => {
    if (!message) return 'N/A';
    if (message.includes(' at ')) {
      return message.split(' at ')[1];
    } else if (message.includes(' | Time: ')) {
      return message.split(' | Time: ')[1];
    }
    return 'N/A';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getModeColor = (mode) => {
    return mode?.toLowerCase() === 'online' 
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800';
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6">
        {error}
        <button 
          onClick={fetchAppointments}
          className="ml-4 bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Appointments Management</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <div className="text-sm text-yellow-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <div className="text-sm text-green-600">Approved</div>
            <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow">
            <div className="text-sm text-red-600">Rejected</div>
            <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <div className="text-sm text-blue-600">Completed</div>
            <div className="text-2xl font-bold text-blue-700">{stats.completed}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status} ({status === 'all' ? stats.total : stats[status] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No appointments found</p>
          <p className="text-gray-400 mt-2">Try changing your filter or add new appointments</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{app.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{app.full_name}</div>
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {extractServiceFromMessage(app.message)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(app.preferred_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {extractTimeFromMessage(app.message)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${getModeColor(app.preferred_treatment_type)}`}>
                      {app.preferred_treatment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                      <option value="completed">Complete</option>
                    </select>
                    
                    <button
                      onClick={() => {
                        setSelectedAppointment(app);
                        setShowDetails(true);
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Appointment Details #{selectedAppointment.id}</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium">{selectedAppointment.full_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="font-medium">{selectedAppointment.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{selectedAppointment.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Service</label>
                <p className="font-medium">{extractServiceFromMessage(selectedAppointment.message)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">{formatDate(selectedAppointment.preferred_date)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Time</label>
                <p className="font-medium">{extractTimeFromMessage(selectedAppointment.message)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Mode</label>
                <p className="font-medium">{selectedAppointment.preferred_treatment_type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className={`font-medium capitalize ${getStatusColor(selectedAppointment.status)} inline-block px-2 py-1 rounded`}>
                  {selectedAppointment.status}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-500">Message</label>
                <p className="font-medium bg-gray-50 p-3 rounded">{selectedAppointment.message}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Created At</label>
                <p className="font-medium">{formatDateTime(selectedAppointment.created_at)}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;