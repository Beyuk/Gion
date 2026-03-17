import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

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
    services: "General Checkup",
  });

  const services = [
    "General Checkup",
    "Teeth Cleaning",
    "Dental Filling",
    "Root Canal",
    "Teeth Whitening",
    "Orthodontic Consultation",
  ];

  const availableTimes = [
    "8:00 AM","8:30 AM","9:00 AM","9:30 AM",
    "10:00 AM","11:00 AM","11:30 AM",
    "1:00 PM","2:00 PM","2:30 PM",
    "3:00 PM","3:30 PM","4:00 PM",
    "5:00 PM","5:30 PM","6:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear any previous errors when user starts typing
    setBookingError(null);
  };

  const handleConfirmBooking = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.phone || !formData.date || !formData.time) {
        alert("Please fill in all required fields");
        return;
      }

      // Set loading state
      setIsLoading(true);
      setBookingError(null);

      // Prepare payload matching backend expectations
      const payload = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email || null, // Send null if empty
        service: formData.services,
        preferred_mode: formData.mode,     // ← Changed from "mode" to "preferred_mode"
        preferred_date: formData.date,      // ← Changed from "date" to "preferred_date"
        preferred_time: formData.time       // ← Changed from "time" to "preferred_time"
      };

      console.log("📤 Sending to backend:", payload);

      const res = await axios.post("http://localhost:5000/api/appointments", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ Success:", res.data);
      
      // Show success message
      alert("Appointment booked successfully!");
      setIsConfirmed(true);
      
    } catch (error) {
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Show user-friendly error message
      if (error.response) {
        // Server responded with error
        const errorMsg = error.response.data.message || error.response.data.error || 'Server error';
        alert(`Booking failed: ${errorMsg}`);
        setBookingError(errorMsg);
      } else if (error.request) {
        // Request made but no response
        alert("Cannot connect to server. Please check if backend is running on port 5000");
        setBookingError("Connection error - backend not responding");
      } else {
        // Other errors
        alert(`Error: ${error.message}`);
        setBookingError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.name && formData.phone;
  const isStep2Valid = formData.date && formData.time;

  return (
    <div id="appointments" className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Book Appointment</h1>
          <p className="text-gray-600 mt-2">Gion Dental Clinic Patient Registration</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {bookingError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error: {bookingError}
            </div>
          )}
          
          <AnimatePresence mode="wait">

            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Patient Information
                </h2>

                <div className="space-y-4">
                  <input 
                    name="name" 
                    placeholder="Full Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    required
                  />
                  <input 
                    name="phone" 
                    placeholder="Phone Number" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    required
                  />
                  <input 
                    name="email" 
                    placeholder="Email Address (Optional)" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    type="email"
                  />
                </div>

                <button 
                  disabled={!isStep1Valid} 
                  onClick={() => setActiveStep(2)} 
                  className={`btn-primary ${!isStep1Valid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next
                </button>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" /> Appointment Information
                </h2>

                <div className="space-y-4">
                  <select 
                    name="services" 
                    value={formData.services} 
                    onChange={handleInputChange} 
                    className="form-input"
                  >
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>

                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />

                  <select 
                    name="mode" 
                    value={formData.mode} 
                    onChange={handleInputChange} 
                    className="form-input"
                  >
                    <option>In-person</option>
                    <option>Online</option>
                  </select>

                  <div>
                    <p className="font-medium mb-2">Select Time</p>
                    <div className="grid grid-cols-4 gap-3">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, time: t }))}
                          className={`time-btn ${formData.time === t ? "active" : ""}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setActiveStep(1)} className="btn-secondary">
                    Back
                  </button>
                  <button 
                    disabled={!isStep2Valid} 
                    onClick={() => setActiveStep(3)} 
                    className={`btn-primary ${!isStep2Valid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-6"
              >
                {!isConfirmed ? (
                  <>
                    <h2 className="text-2xl font-semibold">Confirm Appointment</h2>
                    <div className="bg-gray-50 border rounded-lg p-5 text-left space-y-1">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                      <p><strong>Service:</strong> {formData.services}</p>
                      <p><strong>Mode:</strong> {formData.mode}</p>
                      <p><strong>Date:</strong> {formData.date}</p>
                      <p><strong>Time:</strong> {formData.time}</p>
                    </div>
                    <button 
                      onClick={handleConfirmBooking} 
                      className="btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
                    <h2 className="text-3xl font-bold">Appointment Confirmed!</h2>
                    <p className="text-gray-600">Thank you for choosing Gion Dental Clinic.</p>
                    <p className="text-sm text-gray-500">We will contact you shortly to confirm your appointment.</p>
                    <button 
                      onClick={() => {
                        setActiveStep(1);
                        setIsConfirmed(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          date: "",
                          time: "",
                          mode: "In-person",
                          services: "General Checkup",
                        });
                      }}
                      className="btn-secondary mt-4"
                    >
                      Book Another Appointment
                    </button>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .form-input { 
          width: 100%; 
          padding: 12px 14px; 
          border: 1px solid #ddd; 
          border-radius: 8px; 
          outline: none; 
          transition: all 0.2s;
        }
        .form-input:focus { 
          border-color: #2563eb; 
          box-shadow: 0 0 0 2px #dbeafe; 
        }
        .btn-primary { 
          background: #2563eb; 
          color: white; 
          padding: 12px 40px; 
          border-radius: 8px; 
          font-weight: 600;
          transition: background 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background: #1d4ed8;
        }
        .btn-secondary { 
          border: 1px solid #2563eb; 
          color: #2563eb; 
          padding: 12px 40px; 
          border-radius: 8px; 
          font-weight: 600;
          background: white;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: #eff6ff;
        }
        .btn-success { 
          background: #16a34a; 
          color: white; 
          padding: 14px 50px; 
          border-radius: 8px; 
          font-weight: 600; 
          font-size: 16px;
          transition: background 0.2s;
        }
        .btn-success:hover:not(:disabled) {
          background: #15803d;
        }
        .btn-success:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .time-btn { 
          padding: 10px; 
          border-radius: 8px; 
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .time-btn:hover {
          background: #f3f4f6;
        }
        .time-btn.active { 
          background: #2563eb; 
          color: white; 
          border: none; 
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;