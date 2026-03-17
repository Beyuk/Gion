import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Beyenech Sikuarie",
      role: "Patient",
      content: "Gion speciality is really a great clinic which gives us amazing services.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 2,
      name: "Rediet Yaikob",
      role: "Patient",
      content: "The clinic provides outstanding care and excellent service.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Isiyak Solomon",
      role: "Patient",
      content: "Amazing experience! Highly professional staff.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      name: "Haile Abebe",
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

  // 🔥 Start Auto Slide
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 4000);
  };

  // 🛑 Stop Auto Slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sky-900">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Gion Speciality Clinic — Trusted healthcare with compassion.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-6">
                <div className="bg-white rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center gap-10">

                  {/* Avatar */}
                  <div className="flex justify-center md:w-1/3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-40 h-40 rounded-full border-4 border-sky-100 shadow-lg object-cover"
                      />
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-700 text-white px-5 py-1 rounded-full text-sm shadow">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3">
                    <FaQuoteLeft className="text-sky-100 text-6xl mb-4" />

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {item.content}
                    </p>

                    <h3 className="text-xl font-semibold text-sky-900">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex mt-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xl ${
                            i < item.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-white shadow-md rounded-full text-sky-700 hover:bg-sky-100 transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white shadow-md rounded-full text-sky-700 hover:bg-sky-100 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "bg-sky-700 scale-125"
                  : "bg-gray-300 hover:bg-sky-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;