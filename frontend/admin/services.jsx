import { useEffect, useState } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services", err);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await axios.delete(`http://localhost:5000/api/admin/services/${id}`);
    loadServices();
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Manage Services</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td>{s.price}</td>
              <td>{s.status}</td>
              <td>
                <button
                  onClick={() => deleteService(s.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
