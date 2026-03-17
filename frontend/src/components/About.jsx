import { FaUserMd, FaMapMarkerAlt, FaClock, FaTeeth } from "react-icons/fa";
import aboutImg from "../assets/About.png";
import { motion } from "framer-motion";

const About = () => {
  const handleScheduleVisit = () => {
    const appointmentSection = document.getElementById("book");
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCallClinic = () => {
    window.location.href = "tel:+251916166261";
  };

  return (
    <section
      id="about"
      className="relative py-32 bg-gradient-to-b from-sky-50 to-white overflow-hidden"
    >
      {/* Floating background shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200 to-sky-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">

          {/* ===== Image Section ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <img
              src={aboutImg}
              alt="Gion Speciality Dental Clinic"
              className="w-full rounded-3xl shadow-2xl object-cover z-10"
            />

            {/* Experience Badge */}
            <div className="absolute -bottom-12 -right-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center">
              <div className="text-3xl font-extrabold">15+</div>
              <div className="text-sm font-semibold">Years Experience</div>
            </div>
          </motion.div>

          {/* ===== Content Section ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex flex-col justify-center space-y-10"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-white shadow-lg">
                  <FaUserMd className="w-6 h-6" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  About{" "}
                  <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    Gion Speciality Dental Clinic
                  </span>
                </h2>
              </div>
              <div className="w-28 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-6"></div>
            </div>

            {/* About Text */}
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-sky-600">
                  Gion Speciality Dental Clinic
                </span>{" "}
                is a unique dental clinic in Ethiopia with a team of more than
                five specialist and certified professional doctors, supported
                by skilled dental hygienists, assistants, and dental
                technicians.
              </p>

              <p>
                Our team has a strong passion for the science and art of
                dentistry, including oral and craniofacial surgery. We are
                highly competent and committed to delivering the best, most
                up-to-date, and friendly dental healthcare services.
              </p>

              <p>
                We treat all our clients with the utmost respect, courtesy,
                professionalism, honesty, and confidentiality.
              </p>

              <p>
                Gion Speciality Dental Clinic was founded in 2009 E.C. by
                professionals who have served at Addis Ababa University for
                more than 20 years, some of whom continue to work as professors
                at different academic ranks.
              </p>

              <p>
                The founder and CEO is a well-renowned and highly qualified
                dental and craniomaxillofacial specialist with more than 15
                years of experience. The clinic was built on a strong vision
                and mission to establish a dental practice that meets the
                highest standards in Ethiopia.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <FaMapMarkerAlt className="w-6 h-6 text-sky-600" />,
                  title: "Location",
                  desc: "Megenagna 3M Mall, Addis Ababa",
                },
                {
                  icon: <FaClock className="w-6 h-6 text-sky-600" />,
                  title: "Working Hours",
                  desc: "Mon - Sat: 8:00 AM - 7:00 PM",
                },
                {
                  icon: <FaTeeth className="w-6 h-6 text-sky-600" />,
                  title: "Specialization",
                  desc: "Comprehensive Dental Services",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 20px 40px rgba(14,165,233,0.3)",
                  }}
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-md cursor-pointer transition-all duration-300"
                >
                  {card.icon}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {card.title}
                    </h4>
                    <p className="text-gray-600">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <button
                onClick={handleScheduleVisit}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-4 px-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Schedule Your Visit
              </button>

              <button
                onClick={handleCallClinic}
                className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold py-4 px-12 rounded-3xl transition-all duration-300"
              >
                Call Clinic
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;