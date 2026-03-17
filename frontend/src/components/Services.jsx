import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            Our Speciality Services
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to provide comfort,
            accuracy, and excellence in patient care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s) => {
            const isExpanded = expandedId === s.id;

            return (
              <div
                key={s.id}
                className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:5000/images/${s.image}`}
                    alt={s.name}
                    className="h-52 w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    Medical Care
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {s.name}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {isExpanded
                      ? s.description
                      : `${s.description.substring(0, 90)}...`}
                  </p>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(s.id)}
                    className="mt-4 flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 transition"
                  >
                    {isExpanded ? "Show Less" : "Learn More"}
                    <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition" />
                  </button>

                  {/* Extra Info */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t text-sm text-gray-500 space-y-2 animate-fadeIn">
                      <p>✔ Experienced Specialists</p>
                      <p>✔ Advanced Technology</p>
                      <p>✔ Patient-Focused Approach</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;