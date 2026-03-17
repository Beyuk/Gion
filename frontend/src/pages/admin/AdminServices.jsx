// pages/admin/AdminServices.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  // Add or Update service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (editingId) {
        // Update
        await axios.put(`http://localhost:5000/api/services/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setName(""); setDescription(""); setImage(null); setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Failed to save service");
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setName(s.name);
    setDescription(s.description);
    setImage(null);
  };

  if (loading) return <div className="p-10 text-center">Loading services...</div>;

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold">{editingId ? "Edit Service" : "Add Service"}</h2>
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={`http://localhost:5000/images/${s.image}`} alt={s.name} className="h-40 w-full object-cover rounded mb-2"/>
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{s.description}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}