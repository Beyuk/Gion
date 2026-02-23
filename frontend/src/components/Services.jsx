import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-xl shadow">
            <img
              src={`http://localhost:5000/images/${s.image}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{s.description}</p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
