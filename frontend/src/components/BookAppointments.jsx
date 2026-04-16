import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaPhone, 
  FaEnvelope, 
  FaTooth, 
  FaClock,
  FaArrowRight,
  FaArrowLeft,
  FaSpinner,
  FaClinicMedical
} from "react-icons/fa";
import { MdLocationOn, MdOnlinePrediction } from "react-icons/md";

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    mode: "In-person",
    service: "General Checkup",
  });

  const services = [
    "General Checkup",
    "Teeth Cleaning",
    "Dental Filling",
    "Root Canal",
    "Teeth Whitening",
    "Orthodontic Consultation",
    "Dental Implant",
    "Emergency Care",
  ];

  const availableTimes = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setBookingError(null);
  };

  const handleConfirmBooking = async () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setBookingError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setBookingError(null);

    try {
      const payload = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        service: formData.service,
        preferred_mode: formData.mode,
        preferred_date: formData.date,
        preferred_time: formData.time
      };

      const res = await axios.post("http://localhost:5000/api/appointments", payload);
      
      if (res.data) {
        setIsConfirmed(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError(error.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setActiveStep(1);
    setIsConfirmed(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      mode: "In-person",
      service: "General Checkup",
    });
    setBookingError(null);
  };

  const isStep1Valid = formData.name && formData.phone;
  const isStep2Valid = formData.date && formData.time;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Book Your Appointment
            </h1>
            <p className="text-gray-600 text-lg">Schedule your visit at Gion Speciality Dental Clinic</p>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    activeStep >= step
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all ${
                      activeStep > step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2 text-sm text-gray-500">
            <span>User Info</span>
            <span>Appointment</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <FaTooth className="text-yellow-300" />
              <span className="font-medium">Well Come to Gion speciality </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {bookingError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                <span>{bookingError}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1 - User Information */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          name="phone"
                          placeholder="+251 XXX XXX XXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">We'll call or text to confirm</p>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-gray-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!isStep1Valid}
                    onClick={() => setActiveStep(2)}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isStep1Valid
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue <FaArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step 2 - Appointment Details */}
              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Appointment Details</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaTooth className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none appearance-none bg-white cursor-pointer"
                        >
                          {services.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Mode Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment Mode
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, mode: "In-person" }))}
                          className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                            formData.mode === "In-person"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <FaClinicMedical size={16} />
                          In-person
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, mode: "Online" }))}
                          className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                            formData.mode === "Online"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <MdOnlinePrediction size={16} />
                          Online
                        </button>
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Time <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                        {availableTimes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, time: t }))}
                            className={`py-2 px-2 rounded-lg text-sm transition-all ${
                              formData.time === t
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                                : "border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <FaArrowLeft size={14} /> Back
                    </button>
                    <button
                      disabled={!isStep2Valid}
                      onClick={() => setActiveStep(3)}
                      className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        isStep2Valid
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Review <FaArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Confirmation */}
              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {!isConfirmed ? (
                    <>
                      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FaCheckCircle className="text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Confirm Your Appointment</h2>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">User Name</span>
                          <span className="font-medium text-gray-800">{formData.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Phone</span>
                          <span className="font-medium text-gray-800">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Service</span>
                          <span className="font-medium text-gray-800">{formData.service}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Date & Time</span>
                          <span className="font-medium text-gray-800">{formData.date} • {formData.time}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Mode</span>
                          <span className="font-medium text-gray-800">{formData.mode}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveStep(2)}
                          className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirmBooking}
                          disabled={isLoading}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isLoading ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              Booking...
                            </>
                          ) : (
                            "Confirm Booking"
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Appointment Confirmed! 🎉</h2>
                      <p className="text-gray-600">
                        Thank you for choosing <span className="font-medium">Gion Speciality Dental Clinic</span>
                      </p>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">
                          We've sent a confirmation to <strong>{formData.phone}</strong>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          A team member will call you within 24 hours to confirm
                        </p>
                      </div>
                      <button
                        onClick={resetForm}
                        className="mt-4 py-3 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            📍 3M Mall, Megenagna • 4th Floor • Call us: +251 961 012 087
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;