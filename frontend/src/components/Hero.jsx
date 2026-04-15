import { CalendarCheck, Info, Star, Smile, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroo from "../assets/heroo.png";

const Hero = () => {

  // ✅ SAME SCROLL LOGIC AS HEADER
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6 }}
          className="w-full h-full bg-cover bg-right"
          style={{ backgroundImage: `url(${heroo})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-24">
        <div className="max-w-2xl">

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Brighten Your{" "}
            <span className="text-sky-600 drop-shadow-md">Smile</span>
            <br />
            With Expert Care
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg mt-6 max-w-lg leading-relaxed"
          >
            Professional, gentle, and modern dental care in Addis Ababa.
            We create healthy smiles that last a lifetime.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() => scrollToSection("appointments")}
              className="group inline-flex items-center justify-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-sky-700 hover:scale-[1.04] transition-all duration-300"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Appointment
            </button>

            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() => scrollToSection("services")}
              className="group inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:border-sky-400 hover:text-sky-600 hover:shadow-md transition-all duration-300"
            >
              <Info className="w-5 h-5" />
              View Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-gray-100"
          >
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-semibold text-gray-900">4.9</span>
              <span className="text-gray-400 text-sm">(200+)</span>
            </div>

            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-gray-900">200+</span>
              <span className="text-gray-400 text-sm">Smiles Transformed</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <span className="font-semibold text-gray-900">15+</span>
              <span className="text-gray-400 text-sm">Years Experience</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;