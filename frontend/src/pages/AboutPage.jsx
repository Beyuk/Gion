// src/pages/AboutPage.jsx
import { FaUserMd, FaMapMarkerAlt, FaClock, FaTeeth, FaHeart, FaStar, FaGraduationCap, FaSmile, FaShieldAlt, FaAward, FaPhoneAlt, FaCalendarAlt, FaUsers, FaCheckCircle, FaQuoteRight, FaTooth, FaHandHoldingHeart, FaBuilding, FaMicroscope, FaXRay, FaCamera, FaLaughBeam, FaParking, FaCertificate, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/About.png";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleScheduleVisit = () => {
    navigate("/");
    setTimeout(() => {
      const appointmentSection = document.getElementById("appointments");
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleCallClinic = () => {
    window.location.href = "tel:+251961012087";
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Rest of your component content (technologies, features, testimonials, specialists arrays)
  // ... (keep all your existing content from your About component)

  return (
    <div className="bg-white">
      {/* Back to Home Button */}
      <button
        onClick={handleBackToHome}
        className="fixed top-24 left-6 z-50 bg-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-teal-700 transition-all shadow-lg"
      >
        <FaArrowLeft />
        Back to Home
      </button>

      {/* Rest of your beautiful About content */}
      {/* Hero Section, Our Office, Founder Section, etc. */}
    </div>
  );
};

export default AboutPage;