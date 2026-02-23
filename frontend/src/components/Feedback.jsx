import { useState } from "react";
import { Send, MessageSquare, CheckCircle } from "lucide-react";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.message) return;

    // ✅ Here you can add future backend request later
    // Example:
    // fetch("/api/send-feedback", { method: "POST", body: JSON.stringify(formData) })

    setSubmitted(true);

    // Clear the form
    setFormData({ name: "", message: "" });
  };

  return (
    <section
      id="feedback"
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <MessageSquare className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Patient Feedback
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We value your experience at Gion Speciality Dental Clinic.  
            Please share your feedback to help us improve our services.
          </p>
        </div>

        {/* Feedback Form or Confirmation */}
        {!submitted ? (
          <div className="bg-white shadow-xl rounded-2xl p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Feedback
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your feedback here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                <Send className="w-5 h-5" />
                Send Feedback
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
            <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
            <h3 className="text-2xl font-bold text-gray-900">
              Thank you!
            </h3>
            <p className="text-gray-600">
              Your feedback has been successfully submitted.  
              We appreciate your input and will review it carefully.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Submit Another Feedback
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;
