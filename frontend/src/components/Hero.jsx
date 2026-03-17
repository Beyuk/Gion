import { CalendarCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-sky-50 via-white to-white min-h-screen flex items-center overflow-hidden"
    >
      {/* Background glow shapes */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-sky-200 rounded-full blur-3xl opacity-30 hidden lg:block"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-sky-100 rounded-full blur-2xl opacity-20 hidden lg:block"></div>

      <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left space-y-5"
        >
          {/* Badge */}
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sky-600 bg-sky-100 rounded-full tracking-wide">
            Trusted Dental Care
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Brighten Your Smile <span className="text-sky-700">With Expert Care</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-gray-700 text-lg max-w-md mx-auto lg:mx-0">
            Professional, gentle, and modern dental care in Addis Ababa. We create healthy smiles that last a lifetime.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
            <motion.a
  href="#appointments"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-flex items-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-sky-700 transition-all"
>
  <CalendarCheck className="w-6 h-6" />
  Book Appointment
</motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 border border-sky-600 text-sky-600 px-6 py-4 rounded-xl text-lg font-medium hover:bg-sky-50 transition-all"
            >
              <Info className="w-5 h-5" />
              View Services
            </motion.a>
          </div>

          {/* Optional trust badges */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-gray-600 text-sm">
            <span>⭐️ 4.9 Customer Rating</span>
            <span>•</span>
            <span>200+ Smiles Transformed</span>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 flex justify-center lg:justify-end relative"
        >
          <div className="relative">
            <img
              src={hero}
              alt="Smiling dental patient"
              className="w-[320px] sm:w-[380px] lg:w-[480px] rounded-xl shadow-2xl"
            />
            {/* Optional accent card behind image */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-100 rounded-xl opacity-40 blur-2xl hidden lg:block"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;