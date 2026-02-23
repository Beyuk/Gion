import { useState, useEffect } from "react";
import { Hospital, Menu, X, PhoneCall } from "lucide-react";

const navList = [
  { id: "home", label: "Home" },
    { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "tips", label: "Tips" },
  { id: "appointments", label: "Appointments" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full bg-white z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Hospital className="w-7 h-7 text-blue-600" />
          <div className="leading-tight">
            <div className="text-lg font-bold text-gray-900">
              Gion Speciality
            </div>
            <div className="text-sm text-gray-500">
              Dental Clinic
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-10">
          {navList.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[15px] font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+251900000000"
            className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            <PhoneCall size={18} />
            Call
          </a>

          <button
            onClick={() => scrollToSection("appointments")}
            className="px-6 py-3 text-[15px] font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navList.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-[15px] font-semibold text-gray-800"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("appointments")}
              className="mt-2 bg-blue-600 text-white py-3 font-semibold rounded-md"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
