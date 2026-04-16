import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageCircle, Navigation, Copy, Check } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error) {
      console.error(error);
      setError("Failed to send message. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if clinic is open
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      
      if (day === 0) {
        setIsOpen(false);
        return;
      }
      
      const openTime = 8;
      const closeTime = 18;
      setIsOpen(hours >= openTime && hours < closeTime);
    };
    
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="bg-gradient-to-br from-gray-50 to-blue-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">Gion Speciality</span> Dental Clinic
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional dental care starts with a simple message. Reach out to us anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm text-gray-700">4.9 · 150+ reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">Trusted since 2009</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isOpen ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side - Clinic Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Clinic Information</h3>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-gray-700">
              {/* Address with copy - FIXED: Changed to 4th Floor */}
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                  <MapPin className="text-blue-600 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">3M Mall, Megenagna</p>
                  <p className="text-gray-500 text-sm">4th Floor, Near Main Entrance & Elevator</p>
                  <p className="text-gray-500 text-sm">Addis Ababa, Ethiopia</p>
                </div>
                <button
                  onClick={() => copyToClipboard("3M Mall, Megenagna, 4th Floor, Addis Ababa, Ethiopia")}
                  className="text-gray-400 hover:text-blue-600 transition-colors shrink-0"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                  <Phone className="text-blue-600 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Phone Number</p>
                  <a href="tel:+251961012087" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +251 961 012 087
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                  <Mail className="text-blue-600 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:danielshukaresakuma@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors break-all">
                    danielshukaresakuma@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                  <Clock className="text-blue-600 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Working Hours</p>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday – Saturday: <span className="font-medium">8:00 AM – 8:00 PM</span></p>
                    <p className="text-red-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <a
                href="tel:+251961012087"
                className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Phone size={18} />
                Call Now: +251 961 012 087
              </a>
              <a
                href="https://wa.me/251961012087"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#20b858] transition-all duration-300 transform hover:scale-[1.02]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=3M+Mall+Megenagna+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
              <p className="text-gray-500 mt-3">We'll respond within 24 hours</p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in">
                <CheckCircle className="text-green-500" size={20} />
                <p className="text-green-700">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in">
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+251 912 345 678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Example: +251 912 345 678</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="How can we help you? (e.g., toothache, cleaning, consultation)"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section - FIXED: Changed to 4th Floor */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    <MapPin size={20} className="text-yellow-400" />
                    📍 3M Mall, Megenagna - 4th Floor
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">Near Main Entrance & Elevator | Free Parking Available</p>
                </div>
                <a
                  href="https://maps.google.com/?q=3M+Mall+Megenagna+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Navigation size={16} />
                  Open in Google Maps
                </a>
              </div>
            </div>
            
            {/* Updated iframe with exact 3M Mall coordinates */}
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.199999999999!2d38.7856!3d9.0234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859f2d7c5b0d%3A0x2a8e3f4b6c7d8e9f!2s3M%20Mall!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Gion Dental Clinic at 3M Mall, Megenagna, Addis Ababa"
                className="hover:opacity-95 transition-opacity"
              ></iframe>
              
              {/* Location badge overlay - FIXED: Changed to 4th Floor */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="text-blue-600" size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Gion Speciality Dental Clinic</p>
                  <p className="text-gray-600 text-xs">3M Mall, Megenagna • 4th Floor</p>
                </div>
              </div>
            </div>
            
            {/* Quick info bar */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Main Entrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Near Elevator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Free Parking</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                📍 Exact location: 3M Mall, Megenagna - 4th Floor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;