import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Mariam Skuarie",
      role: "Patient",
      content: "Gion speciality is really a great clinic which gives us amazing services.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 2,
      name: "Belay Bekele",
      role: "Patient",
      content: "The clinic provides outstanding care and excellent service.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Damnie Sukare",
      role: "Patient",
      content: "Amazing experience! Highly professional staff.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      name: "Haile Aba",
      role: "Patient",
      content: "A truly wonderful clinic with great facilities.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 5,
      name: "Ads New",
      role: "Patient",
      content: "Very clean, organized and modern clinic!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sky-800">Patient Testimonials</h2>
          <p className="mt-3 text-gray-600">
            Gion Clinic — Trusted by thousands of patients.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center">
                  {/* Avatar */}
                  <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-36 h-36 rounded-full border-4 border-sky-200 shadow-md object-cover"
                      />
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-4 py-1 rounded-full text-sm">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 md:pl-10">
                    <div className="relative mb-6">
                      <FaQuoteLeft className="text-sky-200 text-5xl absolute -top-4 -left-6" />
                      <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                        {item.content}
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-sky-800">{item.name}</h3>

                    {/* Rating */}
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xl ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left/Right Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full text-sky-600 hover:bg-sky-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full text-sky-600 hover:bg-sky-100"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-6">
          {testimonials.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer transition-all ${
                currentIndex === i ? "bg-sky-600 scale-110" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
