import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1); // 1 = send code, 2 = reset

  const sendCode = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin-auth/send-reset-code", { email });
      setSuccess(`Reset code sent to your email (check console for testing)`);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin-auth/reset-password", {
        email,
        code,
        newPassword,
      });
      setSuccess(res.data.message);
      setStep(1);
      setEmail("");
      setCode("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Reset Code"
              className="w-full border p-3 mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-3 mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </>
        )}

        <button
          className="w-full bg-purple-600 text-white p-3 rounded"
          onClick={step === 1 ? sendCode : resetPassword}
        >
          {step === 1 ? "Send Reset Code" : "Reset Password"}
        </button>
      </form>
    </div>
  );
}