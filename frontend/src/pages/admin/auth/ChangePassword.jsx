import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        "http://localhost:5000/api/admin-auth/change-password",
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(res.data.message);
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleChange} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white p-3 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
}