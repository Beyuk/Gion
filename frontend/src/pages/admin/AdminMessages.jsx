// pages/admin/AdminMessages.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading messages...</div>;

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      {messages.length === 0 ? (
        <div>No messages yet</div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {m.name}</p>
              <p><strong>Email:</strong> {m.email}</p>
              <p><strong>Phone:</strong> {m.phone}</p>
              <p><strong>Message:</strong> {m.message}</p>
              <p><strong>Received At:</strong> {new Date(m.created_at).toLocaleString()}</p>
              <button onClick={() => handleDelete(m.id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}