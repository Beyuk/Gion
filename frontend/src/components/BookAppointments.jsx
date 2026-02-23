import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    age: "",
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
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM",
    "5:00 PM", "5:30 PM", "6:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 CONNECTED TO BACKEND
  const handleConfirmBooking = async () => {
    try {
      const payload = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email || "test@gmail.com",
        service_id: 1, // temporary until we load from DB
        preferred_treatment_type: formData.mode,
        preferred_date: formData.date,
        message: formData.services + " | Time: " + formData.time
      };

      const res = await axios.post(
        "http://localhost:5000/api/appointments",
        payload
      );

      console.log("SUCCESS:", res.data);
      setIsConfirmed(true);

    } catch (error) {
      console.log("ERROR:", error);
      alert("Booking failed. Check backend.");
    }
  };

  const isStep1Valid = formData.name && formData.phone && formData.sex && formData.age;
  const isStep2Valid = formData.date && formData.time;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Book Appointment
          </h1>
          <p className="text-gray-600 mt-2">
            Gion Dental Clinic Patient Registration
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {activeStep === 1 && (
              <motion.div className="space-y-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Patient Information
                </h2>

                <div className="space-y-4">
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="form-input" />

                  <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="form-input" />

                  <input name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="form-input" />

                  <div className="grid grid-cols-2 gap-4">
                    <select name="sex" value={formData.sex} onChange={handleInputChange} className="form-input">
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} className="form-input" />
                  </div>
                </div>

                <button disabled={!isStep1Valid} onClick={() => setActiveStep(2)} className="btn-primary">
                  Next
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {activeStep === 2 && (
              <motion.div className="space-y-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" /> Appointment Information
                </h2>

                <div className="space-y-4">
                  <select name="services" value={formData.services} onChange={handleInputChange} className="form-input">
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-input" />

                  <select name="mode" value={formData.mode} onChange={handleInputChange} className="form-input">
                    <option>In-person</option>
                    <option>Online</option>
                  </select>

                  <div>
                    <p className="font-medium mb-2">Select Time</p>
                    <div className="grid grid-cols-4 gap-3">
                      {availableTimes.map((t) => (
                        <button key={t} onClick={() => setFormData((p) => ({ ...p, time: t }))} className={`time-btn ${formData.time === t ? "active" : ""}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setActiveStep(1)} className="btn-secondary">Back</button>
                  <button disabled={!isStep2Valid} onClick={() => setActiveStep(3)} className="btn-primary">Next</button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {activeStep === 3 && (
              <motion.div className="text-center space-y-6">
                {!isConfirmed ? (
                  <>
                    <h2 className="text-2xl font-semibold">Confirm Appointment</h2>

                    <div className="bg-gray-50 border rounded-lg p-5 text-left space-y-1">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Service:</strong> {formData.services}</p>
                      <p><strong>Date:</strong> {formData.date}</p>
                      <p><strong>Time:</strong> {formData.time}</p>
                    </div>

                    <button onClick={handleConfirmBooking} className="btn-success">
                      Confirm Booking
                    </button>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
                    <h2 className="text-3xl font-bold">Appointment Confirmed</h2>
                    <p className="text-gray-600">
                      Thank you for choosing Gion Dental Clinic.
                    </p>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .form-input { width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 8px; outline: none; }
        .form-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px #dbeafe; }
        .btn-primary { background: #2563eb; color: white; padding: 12px 40px; border-radius: 8px; font-weight: 600; }
        .btn-secondary { border: 1px solid #2563eb; color: #2563eb; padding: 12px 40px; border-radius: 8px; font-weight: 600; }
        .btn-success { background: #16a34a; color: white; padding: 14px 50px; border-radius: 8px; font-weight: 600; font-size: 16px; }
        .time-btn { padding: 10px; border-radius: 8px; border: 1px solid #ddd; }
        .time-btn.active { background: #2563eb; color: white; border: none; }
      `}</style>
    </div>
  );
};

export default BookAppointment;
