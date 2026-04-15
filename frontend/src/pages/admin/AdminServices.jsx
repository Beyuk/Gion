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
        // UPDATE - Fixed version
        console.log("Updating service ID:", editingId);
        console.log("Data being sent:", { name, description, hasImage: !!image });
        
        const response = await axios.put(
          `http://localhost:5000/api/services/${editingId}`, 
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        console.log("Update response:", response.data);
        alert("Service updated successfully!");
      } else {
        // CREATE
        console.log("Creating new service");
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Service added successfully!");
      }

      // Clear form and refresh
      setName("");
      setDescription("");
      setImage(null);
      setEditingId(null);
      fetchServices();
      
      // Reset file input
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";
      
    } catch (err) {
      console.error("Error saving service:", err);
      console.error("Error details:", err.response?.data);
      alert(`Failed to save service: ${err.response?.data?.error || err.message}`);
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      alert("Service deleted successfully!");
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service");
    }
  };

  const handleEdit = (s) => {
    console.log("Editing service:", s);
    setEditingId(s.id);
    setName(s.name);
    setDescription(s.description);
    setImage(null); // Clear image selection when editing
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setImage(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  if (loading) return <div className="p-10 text-center">Loading services...</div>;

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>
        
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
          rows="4"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Image {editingId && "(Leave empty to keep current image)"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-3 py-2 rounded w-full"
          />
          {editingId && !image && (
            <p className="text-xs text-gray-500 mt-1">
              Current image will be kept if you don't select a new one
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Services List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={`http://localhost:5000/uploads/${s.image}`} 
              alt={s.name} 
              className="h-40 w-full object-cover rounded mb-2"
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{s.description}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(s)} 
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(s.id)} 
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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