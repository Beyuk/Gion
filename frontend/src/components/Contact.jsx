import { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900">
            Contact Gion Speciality Dental Clinic
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional dental care starts with a simple message
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="bg-white rounded-2xl shadow-md p-10">
            <h3 className="text-2xl font-semibold mb-8">Clinic Information</h3>

            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <MapPin className="text-blue-600" />
                <span>Addis Ababa, Ethiopia</span>
              </div>

              <div className="flex gap-4">
                <Phone className="text-blue-600" />
                <span>+251 920 552 722</span>
              </div>

              <div className="flex gap-4">
                <Mail className="text-blue-600" />
                <span>danielshukaresakuma@gmail.com</span>
              </div>

              <div className="flex gap-4">
                <Clock className="text-blue-600" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-sm text-gray-500">
                    Monday – Saturday: 8:00 AM – 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-10">
            <h3 className="text-2xl font-semibold mb-8">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-lg"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-lg"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-lg resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;