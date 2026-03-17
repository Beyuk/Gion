import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editReason, setEditReason] = useState('');

  const fetchAppointment = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/${id}`);
      setAppt(res.data);
      setEditDate(res.data.preferred_date.split('T')[0]);
      setEditTime(res.data.preferred_date.split('T')[1]?.substring(0,5) || '');
      setEditReason(res.data.reject_reason || '');
      setError(null);
    } catch (err) {
      setError('Failed to load appointment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointment(); }, [id]);

  const updateStatus = async (newStatus, payload = {}) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status: newStatus, ...payload });
      fetchAppointment();
    } catch (err) {
      alert('Failed to update');
    }
  };

  const handleReject = () => {
    const reason = prompt('Enter reject reason:');
    if (reason) updateStatus('rejected', { reject_reason: reason });
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!appt) return null;

  return (
    <div className="p-6 md:p-8">
      <button className="mb-4 text-blue-600 underline" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div><strong>Patient:</strong> {appt.full_name}</div>
        <div><strong>Phone:</strong> {appt.phone}</div>
        <div><strong>Service:</strong> {appt.service || appt.preferred_treatment_type}</div>
        <div><strong>Status:</strong> {appt.status.toUpperCase()}</div>

        <div className="flex flex-col md:flex-row md:gap-4 mt-4">
          <div className="flex flex-col">
            <label>Date</label>
            <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
          <div className="flex flex-col">
            <label>Time</label>
            <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} className="border px-2 py-1 rounded" />
          </div>
          <div className="flex flex-col">
            <label>Reject Reason</label>
            <input type="text" value={editReason} onChange={(e) => setEditReason(e.target.value)} className="border px-2 py-1 rounded" placeholder="Optional" />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => updateStatus(appt.status, { preferred_date: editDate, preferred_time: editTime, reject_reason: editReason })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          {appt.status === 'pending' && (
            <button
              onClick={() => updateStatus('approved')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
          )}
          {appt.status === 'pending' && (
            <button
              onClick={handleReject}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}