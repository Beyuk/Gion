import { FaUserMd, FaClock, FaTeeth, FaHeart, FaPhoneAlt, FaCalendarAlt, FaCheckCircle, FaMicroscope, FaXRay, FaCamera, FaLaughBeam, FaCertificate, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/About.png";

const About = () => {
  const navigate = useNavigate();

  const handleScheduleVisit = () => {
    // Check if we're on the home page or about page
    if (window.location.pathname === "/") {
      // On home page, just scroll to appointments section
      const appointmentsSection = document.getElementById("appointments");
      if (appointmentsSection) {
        const y = appointmentsSection.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      // On about page, navigate to home page first, then scroll to appointments
      navigate("/");
      setTimeout(() => {
        const appointmentsSection = document.getElementById("appointments");
        if (appointmentsSection) {
          const y = appointmentsSection.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
    }
  };

  const handleCallClinic = () => {
    window.location.href = "tel:+251961012087";
  };

  const technologies = [
    { icon: <FaMicroscope />, title: "CBCT 3D Imaging", desc: "Precise, low-radiation scans for accurate diagnoses" },
    { icon: <FaCamera />, title: "Intraoral Cameras", desc: "See exactly what we see with high-res images" },
    { icon: <FaXRay />, title: "Digital X-Rays", desc: "Quick, safe, and sharp — reducing radiation exposure" },
    { icon: <FaLaughBeam />, title: "Sedation Dentistry", desc: "Relax with options for anxiety-free care" },
  ];

  const features = [
    { icon: <FaCertificate />, title: "Upfront Pricing", desc: "No surprises. You'll know exactly what to expect." },
    { icon: <FaTeeth />, title: "Specialist Excellence", desc: "5+ specialists transforming smiles with expertise" },
    { icon: <FaHeart />, title: "Dedicated to You", desc: "We care about your smile, but we care more about you" },
  ];

  const coFounders = [
    {
      name: "Dr. Daniel Shukare Sakuma",
      credentials: "DMD, HDP, PG Certificate in Dental Implantology",
      title: "Senior Oral & Craniomaxillofacial Surgeon",
      role: "General Manager",
      exp: "17+ years",
      achievements: ["Dental Implantology Specialist", "Craniomaxillofacial Expert"],
    },
    {
      name: "Dr. Lakew Assefa",
      credentials: "DMD, MSc",
      title: "Expert Dental Medicine Specialist",
      role: "Co-Founder",
      exp: "25+ years",
      achievements: ["Advanced Surgical Training", "Research Excellence"],
    },
    {
      name: "Dr. Shewamamash Kebede",
      credentials: "DMD",
      title: "Expert Dental Medicine Specialist",
      role: "Vice General Manager",
      exp: "10+ years",
      achievements: ["Clinical Excellence", "Patient Care Leadership"],
    },
  ];

  return (
    // ✅ ADDED id="about" HERE so header can scroll to it
    <div id="about" className="bg-white pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-sky-50 to-white pt-12 pb-16">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-sky-600 bg-sky-100 px-4 py-1.5 rounded-full inline-block mb-4">
              Get to know us!
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Gion Speciality
              </span>
              <br />
              Dental Clinic
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Serving Addis Ababa with excellence since 2009 E.C.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Office Section */}
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Office</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              At Gion Speciality Dental Clinic, going to the dentist is simple and enjoyable. 
              We're all about honest care delivered in modern, welcoming surroundings.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team provides the full spectrum of oral healthcare treatments with an eye for 
              surgical excellence and cosmetic perfection.
            </p>
            <div className="flex items-center gap-2 text-sky-600 font-medium">
              <FaClock />
              <span>Open Monday to Saturday — 8:00 AM - 7:00 PM</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={aboutImg} alt="Gion Speciality Dental Clinic Office" className="w-full h-auto" />
          </motion.div>
        </div>
      </div>

      {/* Co-Founders Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Meet Our Co-Founders</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Visionary leaders committed to excellence in dental care
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {coFounders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-center">
                  <div className="bg-white/20 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <FaUserMd className="text-white text-5xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                  <p className="text-sky-100 text-sm font-medium">{founder.credentials}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {founder.role}
                    </span>
                    <p className="font-semibold text-gray-800">{founder.title}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <FaBriefcase className="text-sky-500 text-sm" />
                      <span>{founder.exp} of experience</span>
                    </div>
                    {founder.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <FaCheckCircle className="text-sky-500 text-xs" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Advanced Technology</h2>
            <p className="text-gray-500">Modern equipment for exceptional comfort and precision</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-sky-500 text-4xl mb-4 flex justify-center">{tech.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{tech.title}</h3>
                <p className="text-gray-500 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-xl p-8 shadow-md"
              >
                <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-sky-500 text-2xl">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Care at Gion Speciality — <span className="text-sky-600">painless & pleasant</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Experience dentistry redefined with compassionate specialists and modern technology.
              Your smile is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScheduleVisit}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <FaCalendarAlt />
                Book Appointment
              </button>
              <button
                onClick={handleCallClinic}
                className="border-2 border-sky-500 text-sky-600 font-semibold py-3 px-8 rounded-full hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
              >
                <FaPhoneAlt />
                Call: 0961 01 2087
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;