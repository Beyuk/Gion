// src/pages/admin/AdminAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/appointments") // backend API URL
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch appointments. Please check backend.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service ID</th>
              <th>Preferred Treatment</th>
              <th>Preferred Date</th>
              <th>Message</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.full_name}</td>
                <td>{app.phone}</td>
                <td>{app.email}</td>
                <td>{app.service_id}</td>
                <td>{app.preferred_treatment_type}</td>
                <td>{app.preferred_date}</td>
                <td>{app.message}</td>
                <td>{app.status}</td>
                <td>{app.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAppointments;
