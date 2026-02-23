import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaSmile, FaTooth } from "react-icons/fa";
import { GiToothbrush, GiWaterDrop } from "react-icons/gi";

const tips = [
  {
    title: "Proper Brushing Techniques",
    content:
      "Use a soft-bristled toothbrush and fluoride toothpaste. Brush for at least two minutes in gentle circular motions to ensure thorough cleaning.",
    icon: <GiToothbrush className="w-12 h-12 text-sky-500" />,
  },
  {
    title: "Cavity Prevention",
    content:
      "Avoid sugary snacks and drinks. Brush twice a day and floss daily to prevent plaque buildup and cavities.",
    icon: <FaTooth className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Gum Care",
    content:
      "Keep gums healthy by brushing along the gumline and using an antibacterial mouthwash regularly.",
    icon: <GiWaterDrop className="w-12 h-12 text-purple-500" />,
  },
  {
    title: "Tooth Protection",
    content:
      "Don’t use your teeth to open packages or bite hard objects. Use a mouthguard if you grind your teeth or play sports.",
    icon: <FaShieldAlt className="w-12 h-12 text-yellow-500" />,
  },
  {
    title: "Regular Checkups",
    content:
      "Visit your dentist every six months for professional cleaning and examination to maintain long-term oral health.",
    icon: <FaSmile className="w-12 h-12 text-pink-500" />,
  },
];

const Tips = () => {
  const [activeTip, setActiveTip] = useState(0);

  return (
    <section
      id="tips"
      className="scroll-mt-20 max-w-7xl mx-auto px-6 py-20 relative"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-sky-800 mb-4">
          Dental Care Tips
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Smart dental tips from{" "}
          <span className="font-semibold text-sky-700">
            Gion Speciality Dental Clinic
          </span>
        </p>
      </motion.div>

      {/* Tip Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {tips.map((tip, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTip(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-4 rounded-2xl text-center transition-all duration-300 ${
              activeTip === index
                ? "bg-white/90 backdrop-blur-lg border-b-4 border-sky-400 shadow-xl scale-105"
                : "bg-gray-100 hover:bg-sky-100"
            }`}
          >
            <div className="mb-2">{tip.icon}</div>
            <h3
              className={`font-semibold text-sm md:text-base ${
                activeTip === index ? "text-sky-700" : "text-gray-800"
              }`}
            >
              {tip.title}
            </h3>
          </motion.button>
        ))}
      </div>

      {/* Active Tip Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center"
            >
              {tips[activeTip].icon}
            </motion.div>
            <div className="md:w-3/4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-sky-800 mb-4">
                {tips[activeTip].title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {tips[activeTip].content}
              </p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {tips.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTip(index)}
                whileHover={{ scale: 1.3 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTip === index
                    ? "bg-sky-500 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-sky-300"
                }`}
              ></motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Tips;
