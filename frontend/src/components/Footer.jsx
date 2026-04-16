// src/components/Footer.jsx

import { useState, useCallback } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaRegClock,
  FaPhone,
  FaLinkedinIn,
  FaTooth,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaCalendarCheck,
  FaWhatsapp,
} from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { motion } from "framer-motion";

// ===== CONSTANTS & CONFIGURATION =====

const SOCIAL_LINKS = [
  { 
    icon: <FaInstagram className="text-xl" />, 
    href: "https://instagram.com/giondental", 
    label: "Instagram",
    color: "hover:bg-gradient-to-tr hover:from-pink-500 hover:to-orange-400"
  },
  { 
    icon: <FaTelegram className="text-xl" />, 
    href: "https://t.me/giondental", 
    label: "Telegram",
    color: "hover:bg-[#26A5E4]"
  },
  { 
    icon: <FaFacebook className="text-xl" />, 
    href: "https://facebook.com/giondental", 
    label: "Facebook",
    color: "hover:bg-[#1877F2]"
  },
  { 
    icon: <FaLinkedinIn className="text-xl" />, 
    href: "https://linkedin.com/company/giondental", 
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2]"
  },
  { 
    icon: <FaWhatsapp className="text-xl" />, 
    href: "https://wa.me/251961012087", 
    label: "WhatsApp",
    color: "hover:bg-[#25D366]"
  }
];

const CLINIC_HOURS = [
  { day: "Monday - Friday", time: "8:00 AM - 8:00 PM", isEmergency: false },
  { day: "Saturday", time: "8:00 AM - 7:00 PM", isEmergency: false },
  { day: "Sunday", time: "Emergency Only", isEmergency: true }
];

const TRUST_INDICATORS = [
  { icon: FaShieldAlt, title: "Certified Experts", subtitle: "Licensed Professionals", color: "text-blue-300" },
  { icon: FaStar, title: "5 Star Rated", subtitle: "500+ Happy Patients", color: "text-yellow-400" },
  { icon: FaCalendarCheck, title: "Easy Booking", subtitle: "Same Day Appointments", color: "text-emerald-400" },
  { icon: FaTooth, title: "Modern Technology", subtitle: "Advanced Equipment", color: "text-blue-300" }
];

// QUICK LINKS with correct section mapping
const QUICK_LINKS = [
  { name: "Home", section: "home" },
  { name: "About Us", section: "about" },
  { name: "Services", section: "services" },
  { name: "Book Appointment", section: "appointments" }
];

// ===== ANIMATION VARIANTS =====

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ===== SUBCOMPONENTS =====

const SocialIcon = ({ link, index }) => (
  <motion.a
    key={index}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
    className={`bg-white/10 ${link.color} p-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    {link.icon}
  </motion.a>
);

const TrustIndicator = ({ indicator, index }) => {
  const Icon = indicator.icon;
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="group text-center cursor-pointer"
    >
      <div className="inline-flex p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
        <Icon className={`${indicator.color} text-2xl`} />
      </div>
      <p className="text-sm font-semibold group-hover:text-blue-200 transition-colors">
        {indicator.title}
      </p>
      <p className="text-xs text-white/40">{indicator.subtitle}</p>
    </motion.div>
  );
};

// ===== MAIN COMPONENT =====

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubscribeStatus(null), 3000);
    }
  }, [email]);

  // FIXED: Scroll to section - matches your existing IDs from Header and components
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      const headerOffset = 90; // Matches your Header.jsx offset (90px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      // Fallback for Home if no ID found
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* TOP SECTION WITH LOGO */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-full mr-4 shadow-lg"
            >
              <FaTooth className="text-2xl text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
              Gion Specialty Dental
            </h2>
          </div>
          <p className="text-white/50 text-sm max-w-md">
            Excellence in dental care with a personal touch
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {SOCIAL_LINKS.map((link, index) => (
              <SocialIcon key={index} link={link} index={index} />
            ))}
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          
          {/* CLINIC HOURS */}
          <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <FaRegClock className="mr-3 text-blue-400" /> 
              Clinic Hours
            </h3>
            <ul className="space-y-3">
              {CLINIC_HOURS.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className={item.isEmergency ? 'text-orange-300' : 'text-white/70'}>
                    {item.day}
                  </span>
                  <span className={`font-medium ${item.isEmergency ? 'text-orange-300' : 'text-white/90'}`}>
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-blue-300 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>24/7 Emergency: +251 961 012 087</span>
              </div>
            </div>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <GrContactInfo className="mr-3 text-blue-400" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <FaPhone className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+251961012087" className="hover:text-blue-300 transition-colors block">
                    +251 961 012 087
                  </a>
                  <a href="tel:+251920552722" className="text-white/50 hover:text-blue-300 transition-colors text-xs">
                    +251 920 552 722
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaEnvelope className="text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:danielshukaresakuma@gmail.com" className="text-white/80 hover:text-blue-300 transition-colors break-all text-sm">
                  danielshukaresakuma@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 leading-relaxed text-sm">
                  Megenagna 3M Mall Building<br />
                  4th Floor, Addis Ababa, Ethiopia
                </span>
              </li>
            </ul>
          </motion.div>

          {/* QUICK LINKS - WORKING VERSION */}
          <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <FaArrowRight className="mr-3 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-white/70 hover:text-blue-300 transition-colors flex items-center gap-2 group text-sm w-full cursor-pointer"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-white/50 mb-5 text-sm">
              Get dental tips & special offers
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/30 text-sm"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    Subscribe
                  </>
                )}
              </button>
              {subscribeStatus === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-xs text-center"
                >
                  ✓ Subscribed successfully!
                </motion.p>
              )}
              {subscribeStatus === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs text-center"
                >
                  Please enter a valid email
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* TRUST INDICATORS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pt-8 border-t border-white/10"
        >
          {TRUST_INDICATORS.map((indicator, index) => (
            <TrustIndicator key={index} indicator={indicator} index={index} />
          ))}
        </motion.div>

        {/* BOTTOM COPYRIGHT & LINKS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 text-sm"
        >
          <p className="text-white/40 text-center">
            © {currentYear} Gion Specialty Dental Clinic. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => scrollToSection("privacy")}
              className="text-white/40 hover:text-blue-300 transition-colors text-sm cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => scrollToSection("terms")}
              className="text-white/40 hover:text-blue-300 transition-colors text-sm cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => scrollToSection("cookies")}
              className="text-white/40 hover:text-blue-300 transition-colors text-sm cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;