import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaArrowRight, FaRegCalendarAlt, FaUserFriends, FaAward, 
  FaShieldAlt, FaClock, FaChevronRight, FaPhoneAlt, 
  FaTooth, FaSmile, FaTeeth, FaStar, FaCheckCircle 
} from "react-icons/fa";
import { MdHealthAndSafety, MdOutlineMedicalServices } from "react-icons/md";

const Services = () => {
  const [services, setServices] = useState([]);
  const [expandedStates, setExpandedStates] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleImageError = (serviceId) => {
    setImageErrors(prev => ({ ...prev, [serviceId]: true }));
  };

  const handleBookAppointment = () => {
    const appointmentsSection = document.getElementById('appointments');
    if (appointmentsSection) {
      appointmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+251961012087';
  };

  const getServiceIcon = (name) => {
    if (name?.toLowerCase().includes('implant')) return FaTooth;
    if (name?.toLowerCase().includes('whitening')) return FaSmile;
    if (name?.toLowerCase().includes('brace')) return FaTeeth;
    return MdOutlineMedicalServices;
  };

  const stats = [
    { number: "20+", label: "Dental Procedures", icon: FaTooth, color: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Success Rate", icon: FaAward, color: "from-emerald-500 to-teal-500" },
    { number: "5,000+", label: "Smiles Created", icon: FaSmile, color: "from-amber-500 to-orange-500" }
  ];

  return (
    <section
      id="services"
      className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 scroll-mt-24"
    >
      {/* Minimal Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - Clean & Professional */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-6 border border-gray-100">
            <FaTooth className="text-sky-500 text-sm" />
            <span className="text-gray-700 font-medium text-sm tracking-wide">Our Services</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gray-900">Comprehensive </span>
            <span className="text-sky-600">Dental Care</span>
          </h2>
          
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced treatments tailored to your needs with precision, care, and modern technology.
          </p>

          {/* Stats Row - Clean & Minimal */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm">
                <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white text-sm" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid - Professional Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => {
            const isExpanded = expandedStates[s.id] || false;
            const hasImageError = imageErrors[s.id];
            const ServiceIcon = getServiceIcon(s.name);

            return (
              <div
                key={s.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section - Clean */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {!hasImageError ? (
                    <img
                      src={`http://localhost:5000/uploads/${s.image}`}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImageError(s.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50">
                      <ServiceIcon className="text-5xl text-sky-300 mb-2" />
                      <p className="text-gray-400 text-sm">{s.name}</p>
                    </div>
                  )}
                  
                  {/* Icon Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <ServiceIcon className="text-sky-500 text-lg" />
                    </div>
                  </div>
                </div>

                {/* Content - Clean Typography */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {s.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {isExpanded
                      ? s.description
                      : `${s.description?.substring(0, 95) || ''}${s.description?.length > 95 ? '...' : ''}`}
                  </p>

                  {/* Learn More Link */}
                  <button
                    onClick={() => toggleExpand(s.id)}
                    className="inline-flex items-center gap-1 text-sky-600 font-medium text-sm hover:gap-2 transition-all"
                  >
                    <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                    <FaChevronRight className={`text-xs transition-all ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCheckCircle className="text-emerald-500 text-xs" />
                        <span>Expert dental team</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCheckCircle className="text-emerald-500 text-xs" />
                        <span>Modern technology</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCheckCircle className="text-emerald-500 text-xs" />
                        <span>Flexible scheduling</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={handleBookAppointment}
                          className="flex-1 bg-sky-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-sky-700 transition-colors"
                        >
                          Book Now
                        </button>
                        <button 
                          onClick={handleCallNow}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <FaPhoneAlt className="text-xs" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Simple & Elegant */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-10 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-2">Ready for Your Best Smile?</h3>
              <p className="text-sky-100 mb-6 text-sm">
                Schedule your consultation today
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleBookAppointment}
                  className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all hover:scale-105"
                >
                  <FaRegCalendarAlt />
                  Book Appointment
                </button>
                <button 
                  onClick={handleCallNow}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-white/10 transition-all"
                >
                  <FaPhoneAlt />
                  Call +251 961 012 087
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;