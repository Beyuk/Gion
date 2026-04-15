import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/messages");
      console.log("Messages fetched:", response.data);
      setMessages(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/admin/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/messages/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
        {error}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
        <p className="text-gray-500">When customers send messages, they will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <button
          onClick={fetchMessages}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white rounded-lg shadow-sm border p-5 ${
              !message.is_read ? "border-l-4 border-l-blue-500" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{message.name}</h3>
                <p className="text-sm text-gray-500">{message.email}</p>
                {message.phone && (
                  <p className="text-sm text-gray-500 mt-1">📞 Phone: {message.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!message.is_read && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    New
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{message.message}</p>
            
            <div className="flex gap-3">
              {!message.is_read && (
                <button
                  onClick={() => handleMarkRead(message.id)}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(message.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}