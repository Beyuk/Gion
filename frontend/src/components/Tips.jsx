import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShieldAlt, 
  FaSmile, 
  FaTooth, 
  FaChevronLeft, 
  FaChevronRight,
  FaClock,
  FaStar 
} from "react-icons/fa";
import { GiToothbrush, GiWaterDrop } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const tips = [
  {
    title: "Proper Brushing Techniques",
    content: "Use a soft-bristled toothbrush and fluoride toothpaste. Brush for at least two minutes in gentle circular motions to ensure thorough cleaning. Don't forget to brush your tongue to remove bacteria and freshen your breath.",
    icon: GiToothbrush,
    iconColor: "text-sky-500",
    gradient: "from-sky-500 to-blue-600",
    bgGradient: "from-sky-50 to-blue-100",
    duration: "2-3 minutes",
    benefit: "Removes 95% of plaque",
    tip: "Replace toothbrush every 3-4 months"
  },
  {
    title: "Cavity Prevention",
    content: "Avoid sugary snacks and drinks. Brush twice a day and floss daily to prevent plaque buildup and cavities. Consider dental sealants for extra protection against decay.",
    icon: FaTooth,
    iconColor: "text-blue-500",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-100",
    duration: "Daily routine",
    benefit: "Reduces cavities by 80%",
    tip: "Limit snacking between meals"
  },
  {
    title: "Gum Care",
    content: "Keep gums healthy by brushing along the gumline and using an antibacterial mouthwash regularly. Floss daily to remove plaque between teeth. Healthy gums are pink, firm, and don't bleed.",
    icon: GiWaterDrop,
    iconColor: "text-purple-500",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-100",
    duration: "2 minutes daily",
    benefit: "Prevents gum disease",
    tip: "Use soft-bristled brush"
  },
  {
    title: "Tooth Protection",
    content: "Don't use your teeth to open packages or bite hard objects. Wear a mouthguard during sports activities. If you grind your teeth at night, ask your dentist about a custom night guard.",
    icon: FaShieldAlt,
    iconColor: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50 to-orange-100",
    duration: "Always",
    benefit: "Prevents chips & cracks",
    tip: "Wear mouthguard for sports"
  },
  {
    title: "Regular Checkups",
    content: "Visit your dentist every six months for professional cleaning and examination. Early detection of dental issues saves time, money, and discomfort. Professional cleaning removes tartar that brushing can't.",
    icon: FaSmile,
    iconColor: "text-pink-500",
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-50 to-rose-100",
    duration: "Every 6 months",
    benefit: "90% prevention rate",
    tip: "Don't skip appointments"
  },
];

const Tips = () => {
  const [activeTip, setActiveTip] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTip = () => {
    setIsAutoPlaying(false);
    setActiveTip((prev) => (prev + 1) % tips.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTip = () => {
    setIsAutoPlaying(false);
    setActiveTip((prev) => (prev - 1 + tips.length) % tips.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const IconComponent = tips[activeTip].icon;

  return (
    <section id="tips" className="scroll-mt-20 relative overflow-hidden py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <MdOutlineTipsAndUpdates className="w-5 h-5" />
            <span className="text-sm font-semibold">Expert Advice</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Dental Care{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Tips & Tricks
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional dental advice from{" "}
            <span className="font-semibold text-blue-600">
              Gion Speciality Dental Clinic
            </span>{" "}
            to keep your smile healthy and bright
          </p>
        </motion.div>

        {/* Tips Cards - Modern Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {tips.map((tip, index) => {
            const CardIcon = tip.icon;
            return (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveTip(index);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group p-4 rounded-2xl text-center transition-all duration-300 ${
                  activeTip === index
                    ? `bg-gradient-to-br ${tip.gradient} shadow-xl scale-105`
                    : "bg-white hover:shadow-lg border border-gray-100"
                }`}
              >
                <div className="relative z-10">
                  <div className={`mb-3 transition-all duration-300 flex justify-center ${
                    activeTip === index ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    <CardIcon className={`w-10 h-10 md:w-12 md:h-12 ${
                      activeTip === index ? "text-white" : tip.iconColor
                    }`} />
                  </div>
                  <h3 className={`font-semibold text-sm md:text-base transition-colors ${
                    activeTip === index ? "text-white" : "text-gray-800"
                  }`}>
                    {tip.title}
                  </h3>
                  {activeTip === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <FaStar className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
                {activeTip === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active Tip Content - Enhanced */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTip}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className={`bg-gradient-to-br ${tips[activeTip].bgGradient} rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden`}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
              {/* Icon Circle */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`bg-gradient-to-br ${tips[activeTip].gradient} rounded-3xl p-8 shadow-xl`}
              >
                <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {tips[activeTip].title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                  {tips[activeTip].content}
                </p>
                
                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
                    <FaClock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Recommended Time</p>
                    <p className="font-semibold text-gray-800">{tips[activeTip].duration}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
                    <FaSmile className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Benefit</p>
                    <p className="font-semibold text-gray-800">{tips[activeTip].benefit}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center">
                    <GiToothbrush className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Pro Tip</p>
                    <p className="font-semibold text-gray-800 text-sm">{tips[activeTip].tip}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTip}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-20"
            >
              <FaChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextTip}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-20"
            >
              <FaChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                key={activeTip}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                onAnimationComplete={() => {
                  if (isAutoPlaying) {
                    setActiveTip((prev) => (prev + 1) % tips.length);
                  }
                }}
                className={`h-full bg-gradient-to-r ${tips[activeTip].gradient}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tip Counter */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Tip {activeTip + 1} of {tips.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tips;